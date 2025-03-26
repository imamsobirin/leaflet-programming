/* eslint-disable react/prop-types */
import Sidebar from "../sidebar/Sidebar";
import FilterDateAndShift from "./FilterDateAndShift";
import LoaderInputForm from "./LoaderInputForm";
import LoadingPointTable from "./LoadingPointTable";
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
    <div className="flex flex-row bg-red-500 w-full">
      <div className="min-w-1/5 border border-red-500">
        <Sidebar setMenuIndex={setMenuIndex} />
      </div>
      <div className="menu-span bg-blue-500 w-full">
        {menuIndex === 0 && (
          <>
            <div className="dumping-point flex flex-col gap-1">
              <FilterDateAndShift
                className="w-full"
                filterDate={filterDate}
                setFilterDate={setFilterDate}
                filterShift={filterShift}
                setFilterShift={setFilterShift}
                handleFilterDateChange={handleFilterDateChange}
              />
              <button
                // onClick={() => setShowPopup(true)}
                className="h-10 rounded-md bg-blue-500 font-bold text-white p-0 mx-2"
              >
                Input Loading Point
              </button>
              {/* {showPopup && <PopInputForm setShowPopup={setShowPopup} />} */}

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
