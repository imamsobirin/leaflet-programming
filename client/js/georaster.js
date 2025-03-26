function addGeoTiffLayer(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.arrayBuffer();
    })
    .then((arrayBuffer) => {
      return parseGeoraster(arrayBuffer);
    })
    .then((georaster) => {
      var layer = new GeoRasterLayer({
        georaster: georaster,
        opacity: 1,
        resolution: 256,
      });
      layerControls.addOverlay(layer, "Inventrory Blasting");
      map.fitBounds(layer.getBounds());
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

// Add GeoTIFF layer
var url_to_geotiff_file = "./data/INV_250125.tif";
addGeoTiffLayer(url_to_geotiff_file);
