import React, { useContext, useState, useEffect } from "react";
import MapContext from "../map/MapContext";
import { Draw, Snap } from "ol/interaction";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import Select from "ol/interaction/Select";

const DrawFeatures = () => {
  const { map } = useContext(MapContext);
  const [featureType, setFeatureType] = useState("None");

  //   console.log(featureType);

  useEffect(() => {
    if (!map) {
      return;
    }
    addInteraction();
    // // map.addLayer(myData);
    // const snap = new Snap({ source: source });

    // const mapInteraction = () => {
    //   if (featureType !== "None" && featureType !== "Clear") {
    //     map.addInteraction(draw);
    //     map.addInteraction(snap);
    //   } else if (featureType == "Clear") {
    //     if (vector) {
    //       vector.getSource().clear();
    //       map.removeLayer(vector);
    //     }
    //   }
    // };
    // mapInteraction();
    map.addLayer(vector);
    // map.addInteraction(draw);

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(snap);
    };
  }, [featureType]);

  const source = new VectorSource({ wrapX: false });
  const vector = new VectorLayer({
    source: source,
  });
  let draw;
  const snap = new Snap({ source: source });

  function addInteraction() {
    if (featureType !== "None" && featureType !== "Clear") {
      draw = new Draw({
        source: source,
        type: featureType,
      });
      map.addInteraction(draw);
      map.addInteraction(snap);
    } else if (featureType == "Clear") {
      if (vector) {
        vector.getSource().clear();
        map.removeLayer(vector);
      }
    }
  }

  const changeHandler = (e) => {
    // e.preventDefault();
    setFeatureType(e.target.value);
  };

  const downloadFeatureHandler = () => {
    const select = new Select();
    const selectedFeature = select.getFeatures();
    console.log(selectedFeature);
  };

  const undoHandler = (e) => {
    e.preventDefault();
    draw.removeLastPoint();
  };

  return (
    // <div className="drawFeature d-flex">
    //   <label style={{ color: "blue" }}>
    //     <strong>Geometry type: &nbsp;</strong>{" "}
    //   </label>
    //   <form className="d-flex flex-row">
    //     <select
    //       className="form-control"
    //       onChange={changeHandler}
    //       value={featureType}
    //     >
    //       <option value="Point">Select Type</option>
    //       <option value="Point">Point</option>
    //       <option value="LineString">LineString</option>
    //       <option value="Polygon">Polygon</option>
    //       <option value="Circle">Circle</option>
    //       <option value="Clear">Clear</option>
    //     </select>
    //     <button className="btn btn-info" onClick={undoHandler}>
    //       Undo
    //     </button>
    //   </form>
    //   <button
    //     className="btn btn-primary"
    //     id="download"
    //     onClick={downloadFeatureHandler}
    //   >
    //     Download
    //   </button>
    // </div>

    <>
      <button value="Point" onClick={() => setFeatureType("LineString")}>
        Point
      </button>
      <button value="LineString" onClick={() => setFeatureType("LineString")}>
        LineString
      </button>
      <button value="Polygon" onClick={() => setFeatureType("Polygon")}>
        Polygon
      </button>
      <button value="Circle" onClick={() => setFeatureType("Circle")}>
        Circle
      </button>
      <button value="Clear" onClick={() => setFeatureType("Clear")}>
        Clear
      </button>
    </>
  );
};

export default DrawFeatures;
