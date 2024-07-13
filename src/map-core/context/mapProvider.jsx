import React, { useRef, useState, useEffect } from "react";
import MapContext from "./MapContext";
import * as ol from "ol";
import "ol/ol.css";
import { baseMaps } from "../Layers/BaseMaps";
import MapCotrollers from "../Controls/Controls";
const MapProvider = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [selectedControll, setSelectedControll] = useState(""); // Initial value can be empty string

  const handleControllSelect = (newControll) => {
    setSelectedControll(newControll);
  };
  const [selecedItem, setSelecedItem] = useState(""); // Initial value can be empty string

  const handleItemsSelect = (newControll) => {
    setSelecedItem(newControll);
  };
  return (
    <MapContext.Provider
      value={{
        map,
        mapRef,
        setMap,
        selectedControll,
        handleControllSelect,
        handleItemsSelect,
        selecedItem,
      }}
    >
      <MapCotrollers />
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
