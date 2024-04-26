import { BaseApi } from "../BaseApi";
import { DeleteRegionsQuery, GetAllRegionsQuery, GetOneRegionQuery } from "./RegoinsDto";

export class RegionsApi extends BaseApi {
  public getRegions(query: GetAllRegionsQuery) {
    return this.get("Regions/GetAll", { query });
  }

  public getOneRegion(query: GetOneRegionQuery) {
    return this.get("Regions/GetOne", { query });
  }

  public getRegionsList() {
    return this.get("Regions/GetList");
  }

  public cretaeRegion(json: any) {
    return this.post("Regions/Create", {
      json,
    });
  }

  public updateRegion(json: any) {
    return this.put("Regions/Update", {
      json,
    });
  }

  public deleteRegions(json: DeleteRegionsQuery) {
    return this.post("Regions/Delete", {
      json,
    });
  }
}
