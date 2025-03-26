import MapJs from "./MapJs";
import { useState, useEffect } from "react";
import axios from "axios";
import LeftMenu from "./LeftMenu";
import PopInputForm from "./PopInputForm";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoadingPoint() {
  const today = new Date();
  const initialDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() < 10 ? "0" : "") +
    (today.getMonth() + 1) +
    "-" +
    (today.getDate() < 10 ? "0" : "") +
    today.getDate();

  const [filterDate, setFilterDate] = useState(initialDate);
  const [filterShift, setFilterShift] = useState("1");
  const [loadingPointJson, setLoadingPointJson] = useState(null);
  const [loadingPointFeatures, setLoadingPointFeatures] = useState([]);

  const searchGeoJsonData = () => {
    axios
      .get(`${BASE_URL}/loading-points?date=${filterDate}&shift=${filterShift}`)
      .then((res) => {
        setLoadingPointJson(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    axios
      .get(
        `${BASE_URL}/loading-point-features?date=${filterDate}&shift=${filterShift}`
      )
      .then((res) => {
        setLoadingPointFeatures(res.data);
      });
  };

  const deleteLoadingPoint = (id) => {
    if (confirm("Delete loading point?")) {
      axios
        .delete(`${BASE_URL}/loading-points/${id}`)
        .then(() => {
          searchGeoJsonData();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const updateLoadingPoint = (id, data) => {
    axios
      .put(`${BASE_URL}/loading-points/${id}`, data)
      .then(() => {
        searchGeoJsonData();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    searchGeoJsonData();
  }, []);

  return (
    <>
      <div className="">
        <div className="w-screen h-screen grid grid-cols-[1fr_3fr]">
          <LeftMenu
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            filterShift={filterShift}
            setFilterShift={setFilterShift}
            handleFilterDateChange={searchGeoJsonData}
            loadingPointJson={loadingPointFeatures}
            deleteLoadingPoint={deleteLoadingPoint}
            updateLoadingPoint={updateLoadingPoint}
          />

          <MapJs
            filterDate={filterDate}
            filterShift={filterShift}
            loadingPointJson={loadingPointJson}
            setLoadingPointJson={setLoadingPointJson}
          />
        </div>
      </div>
    </>
  );
}

export default LoadingPoint;
