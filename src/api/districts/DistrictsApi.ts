import { BaseApi } from "../BaseApi";

export class DistrictsApi extends BaseApi {
  public getDistrictsList(query: any) {
    return this.get("Districts/GetList", {
      query,
    });
  }

  public getStreetsList(query: any) {
    return this.get("Street/GetList", {
      query,
    });
  }
}
