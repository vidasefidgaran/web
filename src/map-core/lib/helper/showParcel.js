import { WFS, GeoJSON } from "ol/format";
import { utmConvertor } from "@/lib/utils";
import { equalTo, bbox } from "ol/format/filter";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import CodeStore from "@/store/CodeStore";
import { useContext } from "react";
import MapContext from "../../map/MapContext";
export const showParcel = (
  url,
  param,
  filterValue,
  srsName,
  layer,
  temp = null
) => {
  temp && temp.getSource().clear();
  let tempfeature = new WFS().writeGetFeature({
    srsName: srsName,
    featureNS: layer,
    featureTypes: [layer],
    outputFormat: "application/json",
    filter: equalTo(filterValue, param),
  });
  // console.log(url);
  fetch("https://name.isfahan.ir/saeeserver/wfs", {
    method: "POST",
    body: new XMLSerializer().serializeToString(tempfeature),
  })
    .then((response) => response.json())
    .then((json) => {
      const features = new GeoJSON().readFeatures(json);
      const pointData = features[0].getProperties();
      temp && temp.getSource().addFeatures(features);
      if (features.length > 0) {
        const point = features[0].getGeometry().getCoordinates();
        return point;
      }
    });

  // .then((features) => {
  //   const lastFeature = features[features.length - 1];
  //   const geometry = lastFeature.getGeometry();
  //   const extent = geometry.getExtent();
  //   console.log(extent);
  //   const bboxFilter = bbox(extent);

  //   console.log(bboxFilter);
  //   console.log(extent);
  //   let pontfeature = new WFS().writeGetFeature({
  //     srsName: srsName,
  //     featureNS: "EPSG:900913",
  //     featureTypes: ["geo-pelak:joined_data_nosazi"],
  //     outputFormat: "application/json",
  //     filter: bboxFilter, // Set the bbox filter to the extent of the last feature
  //   });
  // fetch(
  //   "https://tree.najafabad.ir/geoserver/AppTreeNajafabad/wms?",
  //   {
  //     method: "POST",
  //     body: new XMLSerializer().serializeToString(pontfeature),
  //   }
  // )
  //   .then((response) => response.json())
  //   .then((res) => console.log(res));
  // });
  // url: "https://tree.najafabad.ir/geoserver/AppTreeNajafabad/wms?",
  //           params: { LAYERS: "geo-pelak:joined_data_nosazi" },
  //     // Fetch the points inside the parcel
  //     fetch(url, {
  //       method: "POST",
  //       body: new XMLSerializer().serializeToString(pontfeature),
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         const points = new GeoJSON().readFeatures(json);
  //         console.log(points);
  //         // Now you have the points inside the parcel
  //         // You can add them to a source, display them on the map, etc.
  //       });
  //   });
  //   const pointData = features[0].getProperties();
  //   setNosaziCode(pointData.code_nosaz);
  //   setPostalcode(this.props.code);
  //   setAddress(pointData.address_te);
  //   setPlate(pointData.plate_id);
  //   console.log(features);
  //   if (features.length > 0) {
  //     const point = features[0].getGeometry().getCoordinates();
  //     const convertedPoint = utmConvertor(point[0], point[1], 900913);
  //     // Create a new point feature
  //     const newPoint = new Feature({
  //       geometry: new Point(convertedPoint),
  //     });
  //     // Add the new point feature to the VectorSource of the VectorLayer
  //     temp.getSource().addFeature(newPoint);
  //     return convertedPoint;
  //   }
  // });
};
