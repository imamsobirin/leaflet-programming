async function submitFormLoadingPoint() {
  event.preventDefault();
  const date = document.getElementById("date").value;
  const shift = document.getElementById("shift").value;
  const z = parseFloat(document.getElementById("elevasi").value);
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);
  const loadingPoint = document.getElementById("loading-point").value;
  const dumpingPoint = document.getElementById("dumping-point").value;
  const jarak = document.getElementById("jarak").value;
  const material = document.getElementById("material").value;
  const keterangan = document.getElementById("keterangan").value;
  const rl = document.getElementById("rl").value;

  const loader = document.getElementById("loader").value;

  const new_json_loading_point = {
    type: "Feature",
    properties: {
      z,
      rl,
      keterangan,
      loader,
      loadingPoint,
      dumpingPoint,
      jarak,
      material,
      icon: "1201",
      name: "Loading Point " + loader,
      date,
      shift,
    },
    geometry: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  };
  postLoadingPoint("http://localhost:3000", new_json_loading_point);
  document.getElementById("shift").value = 1;
  document.getElementById("elevasi").value = "";
  document.getElementById("latitude").value = "";
  document.getElementById("longitude").value = "";
  document.getElementById("loading-point").value = "";
  document.getElementById("dumping-point").value = "";
  document.getElementById("jarak").value = "";
  document.getElementById("material").value = "";
  document.getElementById("keterangan").value = "";
  document.getElementById("rl").value = "";
  document.getElementById("loader").value = "";

  loadLoadingPointMarkers();
}
