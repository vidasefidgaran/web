import React, { useContext, useEffect, useState } from "react";
import { OverlayContext } from "../Layers/Overlays";
import { transformExtent } from "ol/proj";
import "./mapComponents.css";
import Modal from "@/components/shared/Modal/Modal";
import config from "../config.json";
import MapContext from "../map/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import { showParcel } from "../lib/helper/showParcel";
import CodeStore from "@/store/CodeStore";
import { TileWMS } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { baseMaps } from "../Layers/BaseMaps";

const AddWmsLayers = () => {
  const {
    id,
    isError,
    isLoading,
    key,
    lat,
    lng,
    setId,
    setIsError,
    setIsLoading,
    setKey,
    setLat,
    setX,
    setY,
    setlng,
    x,
    y,
    setIsFetched,
  } = CodeStore();

  const { map } = useContext(MapContext);

  const showLayer = config.selectWfmLayer;
  const selectedLayer = config.wfsLayer;
  const baseWfsUrl = config.baseWfsUrl;
  const projection = config.projection;
  const parcelLayer = baseMaps.getLayers().item(1);

  const temp = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
      fill: new Fill({
        color: "#253289",
      }),
      stroke: new Stroke({
        color: "black",
        width: 2,
      }),
    }),
  });

  const handleMapClick = (event) => {
    setIsLoading(true);

    const clickedCoordinate = event.coordinate;

    const getFeatureInfoUrl = parcelLayer
      .getSource()
      .getFeatureInfoUrl(
        clickedCoordinate,
        map.getView().getResolution(),
        projection,
        {
          INFO_FORMAT: "application/json",
          FEATURE_COUNT: 1,
        }
      );

    fetch(getFeatureInfoUrl)
      .then((response) => response.text())
      .then(function (text) {
        let features = JSON.parse(text);
        setId(features.features[0].id.split(".")[1]);
        // console.log(features.features[0].id);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFetched(true);
      });
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    map.addLayer(temp);
    // Add the event listener to the map
    map.on("click", handleMapClick);

    // Return a cleanup function to remove the event listener
    return () => {
      map.un("click", handleMapClick);
      map.removeLayer(temp);
    };
  }, [map]);
};

export default AddWmsLayers;
