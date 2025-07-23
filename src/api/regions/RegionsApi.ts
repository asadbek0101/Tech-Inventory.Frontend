import { BaseApi } from "../BaseApi";

export class RegionsApi extends BaseApi {
  public getRegionsList() {
    return this.get("Regions/GetList");
  }
}
