import { useContext, useEffect } from "react";
import MapContext from "../context/MapContext";

const Screenshot = () => {
  const { map, selectedControll, selecedItem } = useContext(MapContext);

  const handleScreenshot = () => {
    if (!map) {
      console.error("Map is not available");
      return;
    }

    map.once("postrender", () => {
      const canvas = map.getViewport().querySelector("canvas");
      if (canvas) {
        const dataUrl = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "map-screenshot.jpg";
        link.click();
      } else {
        console.error("Canvas not found");
      }
    });

    map.renderSync();
  };

  useEffect(() => {
    if (selectedControll === "report" && selecedItem === "screenshot") {
      handleScreenshot();
    }
  }, [selectedControll, selecedItem]);

  return null; // No need to render any UI components
};

export default Screenshot;
