"use client";
import React, { useState } from "react";
import Map from "./map/Map";
import { fromLonLat } from "ol/proj";
import config from "./config.json";
import Controls from "./Controls/Controls";
// import MapLayerSwitcher from "./Controls/MapLayerSwitcher";
// import FullScreenControl from "./Controls/FullScreenControl";
import { Overlays } from "./Layers/Overlays";
// import ZoomtoExtentControl from "./Controls/ZoomToExtentControl";
// import MeasurementControl from "./Controls/MeasurementControl";
// import SelectByAttributeForm from "./QueryForm/SelectByAttributeForm";
// import SelectByLocationForm from "./QueryForm/SelectByLocationForm";
// import MousePositionControl from "./Controls/MousePositionControl";
import AddWmsLayers from "./MapComponents/AddWmsLayers";
import GetDeviceLocation from "./Controls/GetDeviceLocation";
import { cn } from "@/lib/utils";
const App = ({
  isGisTools = false,
  isAddWmsLayers = false,
  // isFullScreenControl = false,
  // isMapLayerSwitcher = false,
  // isZoomtoExtentControl = false,
  // isMeasurementContro = false,
  // isMousePositionControl = false,
  // isSelectByAttributeForm = false,
  className = "",
  width = null,
  height = null,
  center = null,
}) => {
  const [attributQueryTable, setAttributQueryTable] = useState(true);
  const [locationQueryTable, setLocationQueryTable] = useState(false);
  const attributeStateHandler = () => {
    setAttributeQueryTable(true);
    setLocationQueryTable(false);
  };

  const locationStateHandler = () => {
    setLocationQueryTable(true);
    setAttributeQueryTable(false);
  };

  return (
    <div
      className={cn(
        ` relative ${width ? `w-[${width}px]` : "w-full"}
        
        ${height ? `h-[${height}px]` : "h-full"} ${
          (!width || !height) && "inset-0"
        }  `
      )}
    >
      <Map
        center={center ? center : fromLonLat(config.center, config.projection)}
        zoom={15}
        className={className}
      >
        {/* AddWmsLayers */}
        {isGisTools || (isAddWmsLayers && <AddWmsLayers />)}
        <Overlays>
          {/* {isGisTools || (isFullScreenControl && <FullScreenControl />)}
          {isGisTools || (isMapLayerSwitcher && <MapLayerSwitcher />)} */}
        </Overlays>
        <Controls isGisTools={false}>
          {/* {isGisTools || (isZoomtoExtentControl && <ZoomtoExtentControl />)}
          {isGisTools || (isMeasurementContro && <MeasurementControl />)}
          {isGisTools || (isMousePositionControl && <MousePositionControl />)} */}
          <GetDeviceLocation />
        </Controls>
        {/* {(attributQueryTable && isGisTools) || isSelectByAttributeForm ? (
          <SelectByAttributeForm />
        ) : locationQueryTable && isGisTools ? (
          <SelectByLocationForm />
        ) : null} */}
      </Map>
    </div>
  );
};

export default App;
