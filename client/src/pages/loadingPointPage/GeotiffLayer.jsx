/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import proj4 from "proj4";
import { useLeafletContext } from "@react-leaflet/core";
import { useMap } from "react-leaflet";
import parseGeoraster from "georaster";
import GeoRasterLayer from "georaster-layer-for-leaflet";

window.proj4 = proj4;

const GeotiffLayer = ({ url }) => {
  const geoTiffLayerRef = useRef(null);
  const context = useLeafletContext();
  const map = useMap();

  useEffect(() => {
    if (!url) {
      console.error("GeoTIFF URL tidak diberikan.");
      return;
    }

    const container = context.layerContainer || context.map;
    let isMounted = true;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.arrayBuffer();
      })
      .then((arrayBuffer) => parseGeoraster(arrayBuffer))
      .then((georaster) => {
        if (!isMounted || !georaster) {
          console.error("GeoRaster tidak berhasil diparsing.");
          return;
        }

        // Pastikan opsi layer ada sebelum dipakai
        const layerOptions = {
          georaster: georaster,
          opacity: 1,
          resolution: 256,
        };

        geoTiffLayerRef.current = new GeoRasterLayer(layerOptions);
        container.addLayer(geoTiffLayerRef.current);

        // Zoom ke layer jika berhasil ditambahkan
        if (geoTiffLayerRef.current.getBounds) {
          map.fitBounds(geoTiffLayerRef.current.getBounds());
        }
      })
      .catch((error) => {
        console.error("Error loading GeoTIFF:", error);
      });

    return () => {
      isMounted = false;
      if (geoTiffLayerRef.current) {
        container.removeLayer(geoTiffLayerRef.current);
      }
    };
  }, [context, url, map]);

  return null;
};

export default GeotiffLayer;
