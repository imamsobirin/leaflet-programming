let measureCoordinates = [];
let measuredDistance = 0;

function haversineDistance(coord1, coord2) {
  const R = 6371;

  // Konversi derajat ke radian
  const toRadians = (degrees) => degrees * (Math.PI / 180);

  // Konversi koordinat ke radian
  const radLat1 = toRadians(coord1[0]);
  const radLon1 = toRadians(coord1[1]);
  const radLat2 = toRadians(coord2[0]);
  const radLon2 = toRadians(coord2[1]);

  // Selisih lintang dan bujur
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;

  // Rumus haversine
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Hitung jarak
  const distance = R * c;
  return distance * 10000; // Jarak dalam kilometer
}

var popup = L.popup();
function onMapClick(e) {
  measureCoordinates.push([e.latlng.lat, e.latlng.lng]);
  if (measureCoordinates.length > 1) {
    measuredDistance += haversineDistance(
      measureCoordinates[measureCoordinates.length - 2],
      measureCoordinates[measureCoordinates.length - 1]
    );
  }

  const polyline = L.polyline(measureCoordinates, { color: "red" }).addTo(map);

  popup
    .setLatLng(e.latlng)
    .setContent("Jarak: " + [e.latlng.lat, e.latlng.lng] + " m")
    .openOn(map);
}

map.on("click", onMapClick);
