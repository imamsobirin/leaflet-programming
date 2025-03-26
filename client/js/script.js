var map = L.map("map", {
  zoomControl: true,
  maxZoom: 20,
  minZoom: 1,
}).fitBounds([
  [-2.9197683708607243, 115.22426605224611],
  [-2.9520412094721697, 115.24962902069093],
]);

map.createPane("pane_GoogleSatellite_0");
map.getPane("pane_GoogleSatellite_0").style.zIndex = 1;
var layer_satellite = L.tileLayer(
  "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    pane: "pane_GoogleSatellite_0",
    opacity: 1.0,
    attribution: "",
    minZoom: 1,
    maxZoom: 28,
    minNativeZoom: 0,
    maxNativeZoom: 19,
  }
).addTo(map);

var popup = L.popup();

let layerControls = L.control.layers({}, {}).addTo(map);
