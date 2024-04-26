import { BaseApi } from "../BaseApi";

export class AvtomatApi extends BaseApi {
  public getAvtomats(query: any) {
    return this.get("Avtomats/GetAll", {
      query,
    });
  }

  public createAvtomat(json: any) {
    return this.post("Avtomats/Create", {
      json,
    });
  }
}
