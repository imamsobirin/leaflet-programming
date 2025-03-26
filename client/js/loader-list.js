async function loaderList() {
  try {
    const loadingPointFeatureCollections = await getLoadingPointsByShiftAndDate(
      "http://localhost:3000",
      "1",
      "2025-02-01"
    );

    if (
      !loadingPointFeatureCollections ||
      !loadingPointFeatureCollections.features
    ) {
      console.error("Data loading points tidak valid");
      return;
    }

    const loadingPointArray = loadingPointFeatureCollections.features;
    let tr = "";
    loadingPointArray.forEach((feature, index) => {
      tr += `
        <tr class=${index % 2 ? "even" : ""}>
          <td>${feature.properties.loader}</td>
          <td>${feature.properties.loadingPoint}</td>
          <td>${feature.properties.dumpingPoint}</td>
          <td>${feature.properties.jarak} m</td>
          <td>${feature.geometry.coordinates[0].toFixed(2)}</td>
          <td>${feature.geometry.coordinates[1].toFixed(2)}</td>
        </tr>
      `;
    });

    const tBody = document.getElementById("loader-list");
    if (tBody) {
      tBody.innerHTML = tr;
    } else {
      console.error("Elemen dengan ID 'loader-list' tidak ditemukan");
    }
  } catch (error) {
    console.error("Terjadi kesalahan saat mengambil data:", error);
  }
}

loaderList();
