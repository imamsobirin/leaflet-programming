async function postLoadingPoint(url, data) {
  await fetch(url + "/save-geojson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}
async function getLoadingPointsByShiftAndDate(url, shift, date) {
  const query = new URLSearchParams({
    shift: shift,
    date: date,
  }).toString();

  try {
    const response = await fetch(`${url}/get-loading-points?${query}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}
