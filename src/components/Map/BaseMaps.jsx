import Group from "ol/layer/Group";
import ImageLayer from "ol/layer/Image";
import { ImageWMS, TileWMS } from "ol/source";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import config from "@/map-core/config.json";

export const baseMaps = new Group({
  title: "نقشه پایه",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    ...config.Layers.map((layer) => {
      return new TileLayer({
        minZoom: layer.minZoom ? layer.minZoom : undefined,
        maxZoom: layer.maxZoom ? layer.maxZoom : undefined,
        source: new TileWMS({
          url: layer.baseWmsUrl,
          crossOrigin: "anonymous",
          params: { LAYERS: layer.layer },
          serverType: "geoserver",
        }),
      });
    }),
  ],
});
