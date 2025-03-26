/* eslint-disable react/prop-types */
function LoadingPointTable({
  loadingPointJson,
  deleteLoadingPoint,
  // updateLoadingPoint,
}) {
  return (
    <>
      <div className="w-full px-2">
        <table className="table-auto w-full">
          <thead className="text-center font-bold">
            <tr className="bg-blue-500 text-white ">
              <th>Date</th>
              <th>Loader</th>
              <th>Load. Point</th>
              <th>Dump. Point</th>
              <th>Distance (m)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loadingPointJson.length > 0 ? (
              loadingPointJson.map((loadingPoint, index) => {
                console.log(loadingPoint);
                return (
                  <tr
                    key={index}
                    className={`text-center ${
                      index % 2 !== 0 ? "" : "bg-blue-100"
                    }`}
                  >
                    <td>{loadingPoint.geojson.properties.date}</td>
                    <td>{loadingPoint.geojson.properties.loader}</td>
                    <td>{loadingPoint.geojson.properties.loadingPoint}</td>
                    <td>{loadingPoint.geojson.properties.dumpingPoint}</td>
                    <td>{loadingPoint.geojson.properties.distance}</td>
                    <td>
                      <button className="w-[30px] h-[30px] p-0 rounded-full bg-green-200">
                        &#x1F58A;
                      </button>
                      <button
                        onClick={() => deleteLoadingPoint(loadingPoint.id)}
                        className="w-[30px] h-[30px] p-0 rounded-full bg-red-200"
                      >
                        &#x274C;
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 ">
                  No Data Yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LoadingPointTable;
