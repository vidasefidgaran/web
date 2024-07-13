import React, { useContext, useEffect } from "react";
import MapContext from "../map/MapContext";
import ZoomToExtent from "ol/control/ZoomToExtent";

const ZoomToExtentControl = () => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let zoomtoextent = new ZoomToExtent({
      extent: [5700000, 3800000, 6000000, 3956095],
      className: "zoomToExtent",
    });

    map.controls.push(zoomtoextent);

    return () => map.controls.remove(zoomtoextent);
  }, [map]);

  return null;
};

export default ZoomToExtentControl;
