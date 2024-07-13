// import axios from "axios";

// import proj4 from "proj4";

// export const Axios = axios.create({
//   baseURL: "https://tree.najafabad.ir/api",
//   timeout: 1000,
// });
// export const AxiosPrivate = axios.create({
//   baseURL: "https://tree.najafabad.ir/api/Account",
//   withCredentials: true,
// });

// export const utmConvertor = (x: string, y: string, formatTochange: string) => {
//   let point = {};
//   let utm;

//   let utmZone = 39;
//   let isNorthernHemisphere = true; // Set to true for northern hemisphere, false for southern hemisphere
//   // Define the UTM coordinates (easting, northing)
//   let easting = +x; // Example easting value
//   let northing = +y; // Example northing value
//   // Define the UTM projection string
//   let utmProjString =
//     "+proj=utm +zone=" +
//     utmZone +
//     (isNorthernHemisphere ? " +north" : " +south");
//   // Define the WGS84 projection string
//   let wgs84ProjString = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
//   // Define the EPSG:900913 projection string (Web Mercator)
//   const epsg900913ProjString =
//     "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs";
//   // Perform the conversion using Proj4js
//   let utmCoords = [easting, northing];
//   let wgs84Coords = proj4(utmProjString, wgs84ProjString, utmCoords);
//   // The wgs84Coords variable now contains the latitude and longitude in WGS84 datum

//   utm = { lat: wgs84Coords[1], lon: wgs84Coords[0] };
//   if (formatTochange == "utm") {
//     return utm;
//   }

//   if (formatTochange == "900913") {
//     // First, define the necessary projections using Proj4js
//     proj4.defs(
//       "EPSG:4326",
//       "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"
//     );
//     proj4.defs(
//       "EPSG:900913",
//       "+title=Web Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs"
//     );

//     // Convert from EPSG:4326 (WGS 84) to EPSG:900913 (Web Mercator)
//     const webMercatorCoords = proj4("EPSG:4326", "EPSG:900913", [
//       utm?.lon,
//       utm?.lat,
//     ]);

//     console.log("Web Mercator coordinates:", webMercatorCoords);

//     point = [webMercatorCoords[0], webMercatorCoords[1]];
//     return point;
//   }
// };

// export const latlongCovertor = (lat: string, lang: string) => {
//   // Include the Proj4 library
//   // For example, if using npm, you can install it with: npm install proj4

//   // Define the source and destination coordinate systems
//   let source = "EPSG:4326"; // WGS84 (latitude and longitude)
//   let dest = "EPSG:3857"; // Web Mercator (x and y)

//   // Example latitude and longitude
//   let latitude = +lat; // Replace with your latitude
//   let longitude = +lang; // Replace with your longitude

//   // Perform the coordinate transformation
//   var point = proj4(source, dest, [longitude, latitude]);

//   // Output the result
//   console.log(
//     "Latitude: " +
//       latitude +
//       ", Longitude: " +
//       longitude +
//       " is converted to x: " +
//       point[0] +
//       ", y: " +
//       point[1]
//   );
// };
