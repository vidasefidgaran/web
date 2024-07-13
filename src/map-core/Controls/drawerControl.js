import React, { useContext, useState, useEffect } from "react";
import MapContext from "../context/MapContext";
import { Draw, Snap } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import Select from "ol/interaction/Select";

const DrawFeatures = () => {
  const { map, selectedControll, selecedItem } = useContext(MapContext);

  //   console.log(featureType);

  useEffect(() => {
    if (!map) {
      return;
    }

    if (selectedControll == "drawer") {
      addInteraction();
    } else {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      map.removeLayer(vector);
    }

    map.addLayer(vector);

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
      map.removeLayer(vector);
    };
  }, [selecedItem, map, selectedControll]);

  const source = new VectorSource({ wrapX: false });
  const vector = new VectorLayer({
    source: source,
  });
  let draw;
  const snap = new Snap({ source: source });

  function addInteraction() {
    if (selecedItem !== "Clear") {
      draw = new Draw({
        source: source,
        type: selecedItem,
      });
      map.addInteraction(draw);
      map.addInteraction(snap);
    } else if (selecedItem == "Clear") {
      if (vector) {
        vector.getSource().clear();
        map.removeLayer(vector);
      }
    }
  }

  const changeHandler = (e) => {
    // e.preventDefault();
    setFeatureType(e.target.value);
  };

  const downloadFeatureHandler = () => {
    const select = new Select();
    const selectedFeature = select.getFeatures();
    console.log(selectedFeature);
  };

  const undoHandler = (e) => {
    e.preventDefault();
    draw.removeLastPoint();
  };
};

export default DrawFeatures;
