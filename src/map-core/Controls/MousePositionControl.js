import React, { useContext, useEffect, useState } from "react";
import MousePosition from "ol/control/MousePosition";
import { createStringXY } from "ol/coordinate";
import MapContext from "../map/MapContext";
import SettingIcon from "/public/icons/setting-fill.svg";
const MousePositionControl = () => {
  const [precisionValue, setPrecisionValue] = useState(5);
  const [epsg, setEpsg] = useState("4326");
  const { map } = useContext(MapContext);
  const [isSetting, setIsSetting] = useState(false);

  useEffect(() => {
    if (!map) {
      return;
    }

    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(precisionValue),
      projection: `EPSG:${epsg}`,

      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: "custom-mouse-position",
      target: document.getElementById("mouse-position"),
      undefinedHTML: "&nbsp;",
    });

    map.controls.push(mousePositionControl);
    // map.addControl(mousePositionControl);

    return () => map.controls.remove(mousePositionControl);
  }, [map, epsg, precisionValue]);

  const precisionValueHandler = (e) => {
    setPrecisionValue(e.target.value);
  };

  const epsgHandler = (e) => {
    setEpsg(e.target.value);
  };

  return (
    <div className="mousePosition bg-primary-500 text-white p-2  rounded-xl flex flex-col  items-end gap-3   ">
      <div className="w-fit gap-4 flex flex-row  items-center justify-between ">
        <div id="mouse-position"></div>

        <SettingIcon
          className="fill-white"
          onClick={() => setIsSetting((value) => !value)}
        />
      </div>

      {isSetting && (
        <div>
          <label className="w-full text-center">Projection: &nbsp; </label>
          <select
            id="projection"
            className="  rounded-lg text-neutral-700 p-1 px-2   "
            onChange={epsgHandler}
            value={epsg}
          >
            <option className=" text-neutral-600 p-2  " value="4326">
              EPSG:4326
            </option>
            <option className=" text-neutral-600 p-2  " value="3857">
              EPSG:3857
            </option>
            <option className=" text-neutral-600 p-2  " value="3329">
              EPSG:3329
            </option>
          </select>
          &nbsp;
          <label className="precision ">Precision: &nbsp;</label>
          <input
            id="precision"
            className="p-1 rounded-lg text-neutral-600 "
            type="number"
            min="0"
            max="12"
            value={precisionValue}
            onChange={precisionValueHandler}
          />
        </div>
      )}
    </div>
  );
};

export default MousePositionControl;
