import { BaseApi } from "../BaseApi";

export class UpsApi extends BaseApi {
  public getUpses(query: any) {
    return this.get("Upses/GetAll", {
      query,
    });
  }

  public getOneUps(query: any) {
    return this.get("Upses/GetOne", {
      query,
    });
  }

  public createUps(json: any) {
    return this.post("Upses/Create", {
      json,
    });
  }

  public updateUps(json: any) {
    return this.put("Upses/Update", {
      json,
    });
  }

  public deleteUps(query: any) {
    return this.delete("Upses/Delete", {
      query,
    });
  }
}
