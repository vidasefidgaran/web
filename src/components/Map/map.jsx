// "use client";
// import React, { useRef, useState, useEffect } from "react";
// // import "./Map.css";
// import MapContext from "./MapContext";
// import * as ol from "ol";
// import "ol/ol.css";
// import { baseMaps } from "./BaseMaps";
// import { cn } from "@/lib/utils";
// import { OPERATOR, getInfoByAttribute } from "@/lib/map/map";
// import config from "@/map-core/config.json";
// import { fromLonLat } from "ol/proj";
// import GetDeviceLocation from "./FindByGps";
// const Map = ({
//   children,
//   zoom = 12,
//   center = fromLonLat(config.center, config.projection),
//   className,
// }) => {
//   const mapRef = useRef();
//   const [map, setMap] = useState(null);
//   const [mapCenter, setMapCenter] = useState(center);
//   const [codeInfo, setCodeInfo] = useState(null);

//   // Function to update selectedParcel

//   const handleCodeSelect = (newControll) => {
//     setCodeInfo(newControll);
//   };
//   // on component mount

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
//   // update center when center prop changes
//   useEffect(() => {
//     if (!map) return;
//     map.getView().setCenter(center);
//     setMapCenter(center);
//     map.getView().setZoom(20);
//   }, [center[0], map]);
//   return (
//     <MapContext.Provider
//       value={{
//         map,
//         handleCodeSelect,
//         codeInfo,
//       }}
//     >
//       <div
//         ref={mapRef}
//         className={cn(className, { "inset-0 absolute": !className })}
//       >
//         <GetDeviceLocation />
//         {children}
//       </div>
//     </MapContext.Provider>
//   );
// };

// export default Map;
import { useEffect, useContext } from "react";
import MapContext from "./MapContext";
import * as ol from "ol";
// import { baseMaps } from "../Layers/BaseMaps";

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
        layers: [],
        controls: [],
        overlays: [],
      };

      const mapObject = new ol.Map(options);
      mapObject.setTarget(mapRef.current);
      setMap(mapObject);

      return () => mapObject.setTarget(undefined);
    }
  }, [mapRef, setMap, zoom, center]);

  return null;
};

export default MapInitializer;
