import React, { useRef, useState, useEffect } from "react";
import MapContext from "./MapContext";
import * as ol from "ol";
import "ol/ol.css";
import { baseMaps } from "../Layers/BaseMaps";

const MapProvider = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  return (
    <MapContext.Provider value={{ map, mapRef, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
