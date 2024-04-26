import { BaseApi } from "../BaseApi";

export class CabelApi extends BaseApi {
  public getCabels(query: any) {
    return this.get("Cables/GetAll", {
      query,
    });
  }

  public createCabel(json: any) {
    return this.post("Cables/Create", {
      json,
    });
  }
}
