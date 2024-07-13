import "./control.css";

import MeasurementControl from "./MeasurementControl";
import DrawFeatures from "./drawerControl";
import Print from "./Print";
import ScreenShot from "./Screenshot";
import Compass from "./Compass";
import GridLine from "./GridLine";

const MapCotrollers = () => {
  return (
    <>
      <DrawFeatures />
      <MeasurementControl />
      <Print />
      <ScreenShot />
      <Compass />
      <GridLine />
    </>
  );
};

export default MapCotrollers;
