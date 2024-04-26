import { BaseApi } from "../BaseApi";

export class UpsApi extends BaseApi {
  public getUpses(query: any) {
    return this.get("Upses/GetAll", {
      query,
    });
  }

  public createUps(json: any) {
    return this.post("Upses/Create", {
      json,
    });
  }
}
