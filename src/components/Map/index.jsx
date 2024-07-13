"use client";

import { fromLonLat } from "ol/proj";
import config from "@/map-core/config.json";
import WMSFeature from "./WMSFeature";
import Map from "./map";
import { cn } from "@/lib/utils";
const MapComponent = ({
  className = "",
  isFullScreen = false,
  children = <></>,
  center = fromLonLat(config.center, config.projection),
}) => {
  return (
    <Map
      center={center}
      className={cn("h-full overflow-hidden w-full bg-white", className)}
      zoom={12}
    >
      <WMSFeature isFullScreen={isFullScreen} />
      {children}
    </Map>
  );
};

export default MapComponent;
