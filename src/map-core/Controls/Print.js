import React, { useContext, useState, useEffect } from "react";
import "ol/ol.css";
import jsPDF from "jspdf";
import MapContext from "../context/MapContext";

const Print = () => {
  const { map, selectedControll, selecedItem } = useContext(MapContext);
  const [scale, setScale] = useState(50);
  const [dpi] = useState(150);
  const [paperSize] = useState("A4");

  // Function to update the scale based on the map zoom level
  const updateScale = () => {
    if (map) {
      const view = map.getView();
      const resolution = view.getResolution();
      const units = view.getProjection().getUnits();
      const dpi = 25.4 / 0.7;
      let scale;

      if (units === "degrees") {
        const mpu = 111194.87428468118;
        scale = resolution * mpu * dpi;
      } else {
        scale = resolution * dpi;
      }

      setScale(Math.round(scale));
    }
  };

  // Attach event listeners to update scale on map interactions
  useEffect(() => {
    if (map) {
      map.getView().on("change:resolution", updateScale);
      updateScale(); // Initial update
    }

    return () => {
      if (map) {
        map.getView().un("change:resolution", updateScale);
      }
    };
  }, [map]);

  // Effect to handle print when selectedControll and selecedItem change
  useEffect(() => {
    if (map && selectedControll === "report" && selecedItem === "print") {
      console.log("printfdfdfdfdf");
      handlePrint();
    }
  }, [selectedControll, selecedItem]);

  const handlePrint = () => {
    const dim = {
      A4: [210, 297],
      A3: [297, 420],
    };

    const inchesPerMm = 0.0393701;
    const pageSize = dim[paperSize];
    if (!pageSize) {
      console.error("Invalid paper size:", paperSize);
      return;
    }
    const width = Math.round(pageSize[0] * inchesPerMm * dpi);
    const height = Math.round(pageSize[1] * inchesPerMm * dpi);
    const resolution = scale / 25.4;
    const size = map.getSize();
    const extent = map.getView().calculateExtent(size);
    const printSize = [width, height];
    map.setSize(printSize);
    map.getView().setResolution(resolution);

    const pdf = new jsPDF("p", "mm", paperSize);
    pdf.setFont("iranyekan");
    pdf.setFontSize(10);
    map.once("postrender", function (event) {
      const canvas = map.getViewport().querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/jpeg");

        // Add logo on the right
        pdf.addImage("images/webgis.png", "JPEG", pageSize[0] - 60, 10, 50, 30);

        // Add title
        pdf.setFontSize(18);
        pdf.text("WebGis Makan Mabna", 10, 20);

        // Add map image
        pdf.addImage(
          dataUrl,
          "JPEG",
          10,
          40,
          pageSize[0] - 20,
          pageSize[1] - 50
        );

        pdf.save("map.pdf");

        map.setSize(size);
        map.getView().fit(extent, { size });
      }
    });

    map.renderSync();
  };

  return null; // No need to render any UI components
};

export default Print;
