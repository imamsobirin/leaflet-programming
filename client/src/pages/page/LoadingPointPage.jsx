import MapJs from "../map/MapJs";
import { useState, useEffect } from "react";
import axios from "axios";
import LeftMenu from "../sidebar/LeftMenu";

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
      <div className="w-full h-screen flex flex-row">
        <div className="w-1/3">
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
        </div>
        <div className="w-2/3">
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
