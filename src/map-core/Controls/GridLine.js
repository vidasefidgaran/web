import React, { useContext, useState, useEffect } from "react";
import "ol/ol.css";
import Graticule from "ol/layer/Graticule";
import MapContext from "../context/MapContext";
import Stroke from "ol/style/Stroke";
const GridLine = () => {
  const { map, selectedControll, selecedItem } = useContext(MapContext);
  const [gridLine, setGridLine] = useState(null);

  const togglerRaticuleLine = () => {
    if (!map) {
      console.error("Map is not available");
      return;
    }

    if (gridLine) {
      // Remove graticule layer
      map.removeLayer(gridLine);
      setGridLine(null);
    } else {
      // Add graticule layer
      const newGraticuleLayer = new Graticule({
        strokeStyle: new Stroke({
          color: "rgba(255,120,0,0.9)",
          width: 2,
          lineDash: [0.5, 4],
        }),
        showLabels: true,
      });
      map.addLayer(newGraticuleLayer);
      setGridLine(newGraticuleLayer);
    }
  };

  useEffect(() => {
    if (selectedControll === "measurement" && selecedItem === "grid") {
      togglerRaticuleLine();
    }
  }, [selectedControll, selecedItem]);

  return null; // No need to render any UI components
};

export default GridLine;
