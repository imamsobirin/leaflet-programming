const getIconSize = (zoom) => {
  if (zoom >= 20) {
    return [80, 120]; // Ukuran besar saat zoom tinggi
  } else if (zoom >= 18) {
    return [50, 75];
  } else {
    return [25, 37.5]; // Ukuran kecil saat zoom rendah
  }
};

// Fungsi untuk membuat icon dengan ukuran dinamis
const createIcon = (iconUrl, zoom) => {
  const size = getIconSize(zoom);
  return L.icon({
    iconUrl: iconUrl,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2], // Anchor di tengah bawah icon
  });
};

// Array untuk menyimpan marker
let markers = [];
async function loadLoadingPointMarkers() {
  const loadingPointFeatureCollections = await getLoadingPointsByShiftAndDate(
    "http://localhost:3000",
    "1",
    "2025-02-01"
  );

  // Menambahkan GeoJSON ke peta
  const loading_point_layer = await L.geoJSON(loadingPointFeatureCollections, {
    pointToLayer: (feature, latlng) => {
      const iconUrl = `./assets/loader icon/${feature.properties.icon}.svg`;
      const initialZoom = map.getZoom();
      const icon = createIcon(iconUrl, initialZoom);

      const marker = L.marker(latlng, { icon, draggable: true }).bindPopup(
        feature.properties.name
      );
      // Buat konten popup dari properti feature
      const popupContent = `
          <b>Fleet:</b> ${feature.properties.loader}<br>
          <b>Posisi:</b> ${feature.properties.loadingPoint}<br>
          <b>Dumping:</b> ${feature.properties.dumpingPoint}<br>
          <b>Jarak:</b> ${feature.properties.jarak}<br>
        `;

      // Bind popup ke marker
      marker.bindPopup(popupContent);
      marker.addTo(map);

      // Menyimpan marker ke array
      markers.push(marker);
      return marker;
    },
  });
  layerControls.addOverlay(loading_point_layer, "Loading Point");

  // Fungsi untuk memperbarui ukuran icon semua marker
  const updateMarkerIcons = (zoom) => {
    markers.forEach((marker) => {
      const iconUrl = marker.options.icon.options.iconUrl;
      const newIcon = createIcon(iconUrl, zoom);
      marker.setIcon(newIcon);
    });
  };

  // Memantau perubahan zoom dan memperbarui icon
  map.on("zoomend", () => {
    const currentZoom = map.getZoom();
    updateMarkerIcons(currentZoom);
  });
}

loadLoadingPointMarkers(); // Panggil fungsi async
