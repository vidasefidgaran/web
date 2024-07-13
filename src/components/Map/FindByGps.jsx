"use client";
import { useContext, useEffect } from "react";
import MapContext from "./MapContext";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { circular } from "ol/geom/Polygon";
import { fromLonLat } from "ol/proj";
import Control from "ol/control/Control";

const GetDeviceLocation = () => {
  const { map } = useContext(MapContext);

  const source = new VectorSource();
  const layer = new VectorLayer({
    source: source,
  });

  useEffect(() => {
    if (!map) {
      return;
    }

    const locateFunc = function () {
      navigator.geolocation.watchPosition(
        function (pos) {
          const coords = [pos.coords.longitude, pos.coords.latitude];
          const accuracy = circular(coords, pos.coords.accuracy);
          source.clear(true);
          source.addFeatures([
            new Feature(
              accuracy.transform("EPSG:900913", map.getView().getProjection())
            ),
            new Feature(new Point(fromLonLat(coords))),
          ]);
        },
        function (error) {
          alert(`ERROR: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
        }
      );
      if (!source.isEmpty()) {
        map.getView().fit(source.getExtent(), {
          padding: [50, 50, 50, 50],
          duration: 500,
        });
      }
    };

    const locate = document.createElement("div");
    locate.className =
      "ol-control ol-unselectable locate  right-2  top-2 h-fit";
    locate.innerHTML = '<button title="Locate me">⦿</button>';
    locate.addEventListener("click", locateFunc);

    const locateControl = new Control({ element: locate });
    map.addControl(locateControl);
    map.addLayer(layer);

    return () => {
      map.removeLayer(layer);
      map.removeControl(locateControl);
      locate.removeEventListener("click", locateFunc);
    };
  }, [map]); // Adjust the dependency array as needed

  return null;
};

export default GetDeviceLocation;
