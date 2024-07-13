import React, { useContext, useState, useEffect } from "react";
import "ol/ol.css";
import ScaleLine from "ol/control/ScaleLine";
import MapContext from "../context/MapContext";

const ScaleLineToggle = () => {
  const { map, selectedControll, selecedItem } = useContext(MapContext);
  const [scaleLineControl, setScaleLineControl] = useState(null);

  const toggleScaleLine = () => {
    if (!map) {
      console.error("Map is not available");
      return;
    }

    if (scaleLineControl) {
      // Remove scale line control
      map.removeControl(scaleLineControl);
      setScaleLineControl(null);
    } else {
      // Add scale line control
      const newScaleLineControl = new ScaleLine({
        units: "metric",
        bar: true,
        steps: 5,
        text: true,
        minWidth: 140,
      });
      setScaleLineControl(newScaleLineControl);
      map.addControl(newScaleLineControl);
    }
  };

  useEffect(() => {
    if (selectedControll === "measurement" && selecedItem === "compass") {
      toggleScaleLine();
    }
  }, [selectedControll, selecedItem]);

  return null; // No need to render any UI components
};

export default ScaleLineToggle;
