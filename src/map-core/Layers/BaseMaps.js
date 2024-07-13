import Group from "ol/layer/Group";
import ImageLayer from "ol/layer/Image";
import { ImageWMS, TileWMS } from "ol/source";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

// Basemaps
export const baseMaps = new Group({
  title: "نقشه پایه",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new TileLayer({
      minZoom: 15,

      source: new TileWMS({
        url: "https://tree.najafabad.ir/geoserver/AppTreeNajafabad/wms?",
        crossOrigin: "anonymous",
        params: { LAYERS: "AppTreeNajafabad:Trees" },
        serverType: "geoserver",
      }),
    }),
  ],
});
