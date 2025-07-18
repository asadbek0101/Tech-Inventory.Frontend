import { BaseApi } from "../BaseApi";

export class DistrictsApi extends BaseApi {
  public getDistricts(query: any) {
    return this.get("Districts/GetAll", {
      query,
    });
  }

  public getOneDistrict(query: any) {
    return this.get("Districts/GetOne", {
      query,
    });
  }

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

  public cretaeDistrict(json: any) {
    return this.post("Districts/Create", {
      json,
    });
  }

  public updateDistrict(json: any) {
    return this.put("Districts/Update", {
      json,
    });
  }

  public deleteDistricts(json: any) {
    return this.post("Districts/Delete", {
      json,
    });
  }
}
