/* eslint-disable react/prop-types */
import {
  MapContainer,
  TileLayer,
  useMapEvent,
  GeoJSON,
  Popup,
  ZoomControl,
  LayersControl,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState, useRef } from "react";
import GeotiffLayer from "./GeotiffLayer";

function UseMapEvent({ setZoom }) {
  useMapEvent("zoomend", (e) => {
    setZoom(e.target.getZoom());
  });
  return null;
}

function ClickPopup() {
  const [position, setPosition] = useState(null);

  useMapEvent("click", (e) => {
    setPosition(e.latlng); // Get the clicked coordinates
  });

  return position ? (
    <Popup position={position}>
      <div>
        <b>Coordinates:</b>
        <br />
        Lat: {position.lat}
        <br />
        Lng: {position.lng}
      </div>
    </Popup>
  ) : null;
}

function MapJs({ loadingPointJson }) {
  const [zoom, setZoom] = useState(12);
  // const [map, setMap] = useState(null);

  const geoTiffUrl = "../../../data/INV_250125.tif";

  const geoJsonRef = useRef(null);

  const getIconSize = (zoom) => {
    if (zoom >= 20) {
      return [80, 120];
    } else if (zoom >= 19) {
      return [70, 105];
    } else if (zoom >= 18) {
      return [60, 90];
    } else if (zoom >= 17) {
      return [50, 75];
    } else {
      return [30, 45];
    }
  };
  const createIcon = (iconUrl, zoom) => {
    const size = getIconSize(zoom);
    return new L.icon({
      iconUrl: iconUrl,
      iconSize: size,
      iconAnchor: [size[0] / 2, 0],
    });
  };

  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.clearLayers(); // Hapus layer lama
      L.geoJSON(loadingPointJson, {
        pointToLayer: pointToLayerWithParam(zoom),
      }).addTo(geoJsonRef.current);
    }
  }, [loadingPointJson]);

  // Icon and Label
  function pointToLayerWithParam(zoom) {
    return function pointToLayer(feature, latlng) {
      const popupContent = `
      <table>
        <tr>
          <th>Fleet</th>
          <td>: ${feature.properties.loader}</td>
        </tr>
        <tr>
          <th>Posisi</th>
          <td>: ${feature.properties.loadingPoint}</td>
        </tr>
        <tr>
          <th>Dumping</th>
          <td>: ${feature.properties.dumpingPoint}</td>
        </tr>
        <tr>
          <th>Jarak</th>
          <td>: ${feature.properties.distance}</td>
        </tr>
      </table>
      `;

      const marker = L.marker(latlng, {
        icon: createIcon(
          `./src/assets/loader icon/${feature.properties.loader}.svg`,
          zoom
        ),
      });
      if (feature.properties) {
        marker.bindPopup(popupContent);
      }

      const label = L.marker([latlng.lat, latlng.lng], {
        icon: createLabelIcon(feature.properties.loader),
      });

      return L.layerGroup([marker, label]); // Group marker & label
    };
  }

  function createLabelIcon(label) {
    return L.divIcon({
      className: "custom-label",
      html: `<div style="text-align:center; background-color:white; border-radius:5px">${label}</div>`,
      iconSize: [75, 20], // Size of the label
    });
  }

  return (
    <>
      <MapContainer
        className="h-full w-full"
        bounds={[
          [-2.950072389079646, 115.21334415270859],
          [-2.922096157642764, 115.25845003709205],
        ]}
        zoom={18}
        maxZoom={18}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />

        <UseMapEvent setZoom={setZoom} />
        <ZoomControl position="bottomleft" />
        <ClickPopup />

        <LayersControl position="topright">
          <LayersControl.Overlay name="Loading Point" checked>
            <GeoJSON
              ref={geoJsonRef}
              key={zoom}
              data={loadingPointJson}
              pointToLayer={pointToLayerWithParam(zoom)}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Georaster Layer">
            <GeotiffLayer url={geoTiffUrl} />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
}

export default MapJs;
