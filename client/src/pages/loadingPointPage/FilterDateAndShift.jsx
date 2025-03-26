/* eslint-disable react/prop-types */

function FilterDateAndShift({
  filterDate,
  filterShift,
  setFilterDate,
  setFilterShift,
  handleFilterDateChange,
}) {
  return (
    <div className="filter-date-and-shift w-full bg-blue-100 ">
      <p className="text-center font-bold text-lg">Filter</p>
      <div className="p-2 grid grid-cols-[3fr_1fr_1fr] items-center gap-1">
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="h-10 p-2 rounded-md"
        />
        <select
          value={filterShift}
          onChange={(e) => setFilterShift(e.target.value)}
          className="h-10 p-2 rounded-md cursor-pointer bg-white"
        >
          <option value="1">Shift 1</option>
          <option value="2">Shift 2</option>
        </select>
        <button
          onClick={handleFilterDateChange}
          className="h-10 rounded-md bg-blue-500 font-bold text-white"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default FilterDateAndShift;
