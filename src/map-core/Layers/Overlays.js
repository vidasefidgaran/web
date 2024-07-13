import React, { useState, createContext } from "react";
import TileLayer from "ol/layer/Tile";
import { OSM, TileWMS } from "ol/source";
export const OverlayContext = createContext();

export const Overlays = ({ children }) => {
  const [overlayLayers, setOverlayLayers] = useState([
    new TileLayer({
      title: "پلاک",
      // minZoom: 17,s
      // maxZoom: 23,
      source: new TileWMS({
        url: "https://tree.najafabad.ir/geoserver/AppTreeNajafabad/wms?",
        params: { LAYERS: "geo-pelak:joined_data_nosazi" },
        serverType: "geoserver",
      }),
    }),
  ]);

  return (
    <OverlayContext.Provider value={[overlayLayers, setOverlayLayers]}>
      {children}
    </OverlayContext.Provider>
  );
};
