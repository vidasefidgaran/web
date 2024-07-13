import { useContext, useEffect, useState } from "react";
import { FeatureInfoUrlCreator } from "../../lib/utils/mapUtils";
import MapContext from "@/map-core/context/MapContext";
import config from "../../config.json";
import { GeoJSON } from "ol/format";
import toast from "react-hot-toast";
import TableComponent from "../table";

const ClickRemortModal = ({ coordinate }) => {
  const [layers, setLayers] = useState([]);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const { map } = useContext(MapContext);
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    setLayers(
      map
        .getLayers()
        .getArray()
        .map((layer) => layer.get("name"))
        .filter((layer) => layer != undefined)
    );
  }, []);

  const handleButtonClick = async () => {
    if (!selectedLayer || !coordinate) {
      return;
    }

    const featureData = await FeatureInfoUrlCreator(
      selectedLayer,
      coordinate,
      map.getView().getResolution(),
      config.projection
    );
    const features = new GeoJSON().readFeatures(featureData)[0];
    if (features) {
      const properties = features.getProperties();
      setHeaders(Object.keys(properties));

      setData([properties]);
    } else {
      toast.error("موردی یافت نشد");
    }

    // setData(featureData);
  };
  const handleLayerChange = (event) => {
    const layerName = event.target.value;
    const layer = map
      .getLayers()
      .getArray()
      .find((layer) => {
        return layer.get("name") == layerName;
      });

    setSelectedLayer(layer);
  };

  return (
    <div>
      <div className="flex flex-row w-full justify-between items-center">
        <select
          onChange={handleLayerChange}
          className="text-neutral-600 outline-none border-neutral-300 border-1 p-1 rounded "
        >
          <option value="">لایه را انتخاب کنید</option>
          {layers.map((layer) => (
            <option key={layer} value={layer} className="text-neutral-500">
              {layer}
            </option>
          ))}
        </select>
        <button
          onClick={handleButtonClick}
          className="rounded bg-primary-500 text-sm p-2 text-white"
        >
          {" "}
          دریافت گزارش
        </button>
      </div>

      {data && <TableComponent headers={headers} data={data} />}
    </div>
  );
};

export default ClickRemortModal;
