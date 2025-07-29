declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.geojson" {
  import { GeoJsonObject } from "geojson";
  const value: GeoJsonObject;
  export default value;
}
