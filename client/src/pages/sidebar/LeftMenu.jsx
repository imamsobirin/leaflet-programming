/* eslint-disable react/prop-types */
import Sidebar from "./Sidebar";
import FilterDateAndShift from "../loadingPointMenu/FilterDateAndShift";
import LoaderInputForm from "../loadingPointMenu/LoaderInputForm";
import LoadingPointTable from "../loadingPointMenu/LoadingPointTable";
// import PopInputForm from "./PopInputForm";
// import { useState } from "react";
import { useState } from "react";

function LeftMenu({
  filterDate,
  setFilterDate,
  filterShift,
  setFilterShift,
  handleFilterDateChange,
  loadingPointJson,
  deleteLoadingPoint,
  updateLoadingPoint,
}) {
  // const [showPopup, setShowPopup] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="w-1/6 border ">
        <Sidebar setMenuIndex={setMenuIndex} menuIndex={menuIndex} />
      </div>
      <div className="menu-span  w-5/6">
        {menuIndex === 0 && (
          <>
            <div className="dumping-point flex flex-col gap-1 ">
              <FilterDateAndShift
                className="w-full"
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterShift={filterShift}
                setFilterShift={setFilterShift}
                handleFilterDateChange={handleFilterDateChange}
              />
              <button className="h-10 rounded-md bg-blue-500 font-bold text-white p-0 mx-2">
                Input Loading Point
              </button>

              <LoaderInputForm handleUpdate={handleFilterDateChange} />
              <LoadingPointTable
                loadingPointJson={loadingPointJson}
                deleteLoadingPoint={deleteLoadingPoint}
                updateLoadingPoint={updateLoadingPoint}
              />
            </div>
          </>
        )}
        {menuIndex === 1 && (
          <>
            <div className="w-full">
              hahahahahahahahahahahahaha ahahah ahah aha aha aha
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LeftMenu;
