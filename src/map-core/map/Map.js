// import React, { useRef, useState, useEffect } from "react";
// import "./Map.css";
// import MapContext from "./MapContext";
// import * as ol from "ol";
// import "ol/ol.css";
// import { baseMaps } from "../Layers/BaseMaps";
// import { cn } from "@/lib/utils";

// const Map = ({ children, zoom, center, className }) => {
//   const mapRef = useRef();
//   const [map, setMap] = useState(null);
//   const [mapCenter, setMapCenter] = useState(center);

//   // on component mount
//   useEffect(() => {
//     let options = {
//       view: new ol.View({
//         zoom,
//         center: mapCenter,
//         extent: [5700000, 3800000, 6000000, 3956095],
//       }),
//       layers: [baseMaps],
//       controls: [],
//       overlays: [],
//     };

//     let mapObject = new ol.Map(options);

//     mapObject.setTarget(mapRef.current);
//     setMap(mapObject);

//     return () => mapObject.setTarget(undefined);
//   }, []);

//   // zoom change handler
//   useEffect(() => {
//     if (!map) return;

//     map.getView().setZoom(zoom);
//   }, [zoom]);

//   // center change handler
//   useEffect(() => {
//     if (!map) return;
//     map.on("moveend", () => {
//       setMapCenter(map.getView().getCenter());
//     });
//   }, [mapCenter]);

//   return (
//     <MapContext.Provider value={{ map }}>
//       <div
//         ref={mapRef}
//         className={cn(className, { "inset-0 absolute": !className })}
//       >
//         {children}
//       </div>
//     </MapContext.Provider>
//   );
// };

// export default Map;
import React, { useEffect, useContext } from "react";
import MapContext from "../context/MapContext";
import * as ol from "ol";
import { baseMaps } from "../Layers/BaseMaps";
import { divIcon } from "leaflet";

const MapInitializer = ({ zoom, center }) => {
  const { mapRef, setMap } = useContext(MapContext);
  useEffect(() => {
    if (mapRef.current) {
      const options = {
        view: new ol.View({
          zoom,
          center,
          extent: [5700000, 3800000, 6000000, 3956095],
        }),
        layers: [baseMaps],
        controls: [],
        overlays: [],
      };

      const mapObject = new ol.Map(options);
      mapObject.setTarget(mapRef.current);
      setMap(mapObject);

      return () => mapObject.setTarget(undefined);
    }
  }, [mapRef, setMap, zoom, center]);

  return <div ref={mapRef} className="absolute inset-0"></div>;
};

export default MapInitializer;