import { useContext, useEffect } from "react";
import "ol/ol.css";
import Draw from "ol/interaction/Draw";
import Overlay from "ol/Overlay";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { LineString, Polygon } from "ol/geom";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { getArea, getLength } from "ol/sphere";
import { unByKey } from "ol/Observable";
import MapContext from "../context/MapContext.jsx";

const MeasurementControl = () => {
  const { map, selectedControll, selecedItem } = useContext(MapContext);

  useEffect(() => {
    if (!map) {
      return;
    }

    const source = new VectorSource();

    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)",
        }),
        stroke: new Stroke({
          color: "rgb(0 176 116 / 0.7)",
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#rgb(0 176 116 / 0.7)",
          }),
        }),
      }),
    });

    map.addLayer(vector);

    let sketch;
    let helpTooltipElement;
    let helpTooltip;
    let measureTooltipElement;
    let measureTooltip;
    const continuePolygonMsg = "برای ادامه کلیک کنید";
    const continueLineMsg = "برای ادامه کلیک کنید";

    const pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }
      let helpMsg = "برای کشیدن کلیک کنید";

      if (sketch) {
        const geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg;
        }
      }

      if (helpTooltipElement) {
        helpTooltipElement.innerHTML = helpMsg;
        helpTooltip.setPosition(evt.coordinate);
        helpTooltipElement.classList.remove("hidden");
      }
    };

    map.on("pointermove", pointerMoveHandler);

    map.getViewport().addEventListener("mouseout", function () {
      if (helpTooltipElement) {
        helpTooltipElement.classList.add("hidden");
      }
    });

    let typeSelect = selecedItem;
    let draw;

    const formatLength = function (line) {
      var length = getLength(line);
      var output;
      if (length > 1000) {
        output = Math.round((length / 1000) * 100) / 100 + " km";
      } else {
        output = Math.round(length * 100) / 100 + " m";
      }
      return output;
    };

    const formatArea = function (polygon) {
      var area = getArea(polygon);
      var output;
      if (area > 100000) {
        output = Math.round((area / 1000000) * 100) / 100 + " km<sup>2</sup>";
      } else {
        output = Math.round(area * 100) / 100 + " m<sup>2</sup>";
      }
      return output;
    };

    function addInteraction() {
      let type = typeSelect === "area" ? "Polygon" : "LineString";

      draw = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)",
          }),
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: 2,
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.7)",
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)",
            }),
          }),
        }),
      });

      if (typeSelect === "select" || typeSelect === "clear") {
        map.removeInteraction(draw);
        if (vector) {
          vector.getSource().clear();
        }
        map.removeOverlay(helpTooltip);
        map.removeOverlay(measureTooltip);

        const elems = document.getElementsByClassName(
          "ol-tooltip ol-tooltip-static"
        );
        while (elems.length > 0) {
          elems[0].parentNode.removeChild(elems[0]);
        }
      } else if (typeSelect === "area" || typeSelect === "length") {
        map.addInteraction(draw);
        createMeasureTooltip();
        createHelpTooltip();

        let listener;
        draw.on("drawstart", function (evt) {
          // set sketch
          sketch = evt.feature;

          /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
          let tooltipCoord = evt.coordinate;

          listener = sketch.getGeometry().on("change", function (evt) {
            const geom = evt.feature;
            let output;
            if (geom instanceof Polygon) {
              output = formatArea(geom);
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof LineString) {
              output = formatLength(geom);
              tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
          });
        });

        draw.on("drawend", function () {
          measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
          measureTooltip.setOffset([0, -7]);
          sketch = null;
          measureTooltipElement = null;
          createMeasureTooltip();
          unByKey(listener);
        });
      }
    }

    function createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement("div");
      helpTooltipElement.className = "ol-tooltip hidden";
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [0, -7],
        positioning: "center-left",
      });
      map.addOverlay(helpTooltip);
    }

    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement("div");
      measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
      measureTooltipElement.style.backgroundColor = "rgb(0 176 116 / 0.7)"; // Background color
      measureTooltipElement.style.color = "white"; // Text color

      measureTooltip = new Overlay({
        element: measureTooltipElement,

        offset: [0, -15],
        positioning: "center-left",
      });
      map.addOverlay(measureTooltip);
    }

    if (selectedControll == "measurement" && selecedItem !== "") {
      addInteraction();
    }

    return () => {
      map.removeInteraction(draw);
      map.removeOverlay(measureTooltip);
      map.removeOverlay(helpTooltip);
      map.removeLayer(vector);

      const elems = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elems.length > 0) {
        elems[0].parentNode.removeChild(elems[0]);
      }
    };
  }, [map, selectedControll, selecedItem]);

  return null;
};

export default MeasurementControl;
