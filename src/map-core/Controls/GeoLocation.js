import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import MapContext from "../map/MapContext";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { circular } from "ol/geom/Polygon";
const GeoLocation = () => {
  const { map } = useContext(MapContext);
  const source = new VectorSource();
  const layer = new VectorLayer({
    source: source,
  });
  map.addLayer(layer);
  return null;
};

export default GeoLocation;
