/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function LoaderInputForm({ handleUpdate }) {
  const new_json_loading_point = {
    type: "Feature",
    properties: {
      loader: "",
      activity: "",
      date: "",
      shift: "",
      elevasi: "",
      loadingPoint: "",
      dumpingPoint: "",
      distance: "",
    },
    geometry: {
      type: "Point",
      coordinates: ["", ""],
    },
  };
  const [newLoader, setNewLoader] = useState(new_json_loading_point);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "latitude") {
      setNewLoader((prevLoader) => ({
        ...prevLoader,
        geometry: {
          ...prevLoader.geometry,
          coordinates: [prevLoader.geometry.coordinates[0], parseFloat(value)],
        },
      }));
    } else if (name === "longitude") {
      setNewLoader((prevLoader) => ({
        ...prevLoader,
        geometry: {
          ...prevLoader.geometry,
          coordinates: [parseFloat(value), prevLoader.geometry.coordinates[1]],
        },
      }));
    } else {
      setNewLoader((prevLoader) => ({
        ...prevLoader,
        properties: {
          ...prevLoader.properties,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      newLoader.properties.loader !== "" &&
      newLoader.geometry.coordinates[0] !== "" &&
      newLoader.geometry.coordinates[1] !== "" &&
      newLoader.properties.loadingPoint !== "" &&
      newLoader.properties.dumpingPoint !== "" &&
      newLoader.properties.jarak !== "" &&
      newLoader.properties.activity !== ""
    ) {
      setNewLoader((prevLoader) => ({
        ...prevLoader,
        properties: {
          ...prevLoader.properties,
          icon: prevLoader.properties.loader.match(/(?<=-)\w+/)[0],
        },
      }));
      await axios
        .post(`${BASE_URL}/loading-points`, newLoader)
        .catch((error) => {
          console.error("Error:", error.response.data);
        });
      setNewLoader(new_json_loading_point);
      handleUpdate();
    } else {
      alert("Data loading point tidak valid");
    }
  };

  return (
    <>
      <form action="" className="p-2 bg-blue-100">
        <div className="input-group w-full gap-1 flex flex-row">
          <div className="input-field flex flex-col  py-1 w-2/3">
            <label className="font-bold text-md pb-1" htmlFor="loader">
              Loader
            </label>
            <select
              name="loader"
              className="rounded-sm p-1 bg-white "
              id="loader"
              value={newLoader.properties.loader}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Loader
              </option>
              <option value="HEX-1201">HEX-1201</option>
              <option value="HEX-1202">HEX-1202</option>
              <option value="HEX-1203">HEX-1203</option>
              <option value="HEX-1204">HEX-1204</option>
              <option value="HEX-1205">HEX-1205</option>
              <option value="HEX-1217">HEX-1217</option>
              <option value="HEX-442">HEX-442</option>
              <option value="HEX-443">HEX-443</option>
              <option value="HEX-447">HEX-447</option>
              <option value="HEX-448">HEX-448</option>
              <option value="HEX-450">HEX-450</option>
              <option value="HEX-457">HEX-457</option>
              <option value="HEX-458">HEX-458</option>
            </select>
          </div>
          <div className="input-field flex flex-col  py-1 w-1/3">
            <label className="font-bold text-md pb-1" htmlFor="activity">
              Activity
            </label>
            <select
              name="activity"
              className="rounded-sm p-1 bg-white text-center"
              id="activity"
              value={newLoader.properties.activity}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Activity
              </option>
              <option value="ob">OB Loading</option>
              <option value="coal">Coal Getting</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
        <div className="input-group w-full gap-1 flex flex-row">
          <div className="input-field flex flex-col  py-1 w-2/3">
            <label className="font-bold text-md pb-1" htmlFor="date">
              Date
            </label>
            <input
              name="date"
              type="date"
              className="rounded-sm p-1 bg-white"
              value={newLoader.properties.date}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field flex flex-col  py-1 w-1/3">
            <label className="font-bold text-md pb-1" htmlFor="date">
              Shift
            </label>
            <select
              name="shift"
              id="shift"
              className="rounded-sm p-1 bg-white text-center"
              value={newLoader.properties.shift}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select Shift
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div className="input-group w-full gap-1 flex flex-row">
          <div className="input-field flex flex-col  py-1 w-1/3">
            <label className="font-bold text-md pb-1" htmlFor="elevasi">
              Elevasi
            </label>
            <input
              name="elevasi"
              type="number"
              step={"any"}
              className="rounded-sm p-1 bg-white"
              value={newLoader.properties.elevasi}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field flex flex-col py-1 w-1/3">
            <label className="font-bold text-md pb-1" htmlFor="latitude">
              Latitude
            </label>
            <input
              name="latitude"
              type="number"
              step={"any"}
              className="rounded-sm p-1 bg-white"
              value={newLoader.geometry.coordinates[1]}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field flex flex-col py-1 w-1/3">
            <label className="font-bold text-md pb-1" htmlFor="longitude">
              Longitude
            </label>
            <input
              required
              name="longitude"
              type="number"
              step={"any"}
              className="rounded-sm p-1 bg-white"
              value={newLoader.geometry.coordinates[0]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="input-group w-full gap-1 flex flex-row">
          <div className="input-field flex flex-col py-1">
            <label className="font-bold text-md pb-1" htmlFor="loadingPoint">
              Loading Point
            </label>
            <input
              required
              name="loadingPoint"
              type="text"
              className="rounded-sm p-1 bg-white"
              value={newLoader.properties.loadingPoint}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field flex flex-col py-1">
            <label className="font-bold text-md pb-1" htmlFor="dumpingPoint">
              Dumping Point
            </label>
            <input
              required
              name="dumpingPoint"
              type="text"
              className="rounded-sm p-1 bg-white"
              value={newLoader.properties.dumpingPoint}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-field flex flex-col py-1">
            <label className="font-bold text-md pb-1" htmlFor="distance">
              Distance
            </label>
            <input
              required
              name="distance"
              type="number"
              step={"any"}
              className="rounded-sm p-1 bg-white"
              value={newLoader.properties.distance}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default LoaderInputForm;
