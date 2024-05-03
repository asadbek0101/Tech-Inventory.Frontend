import { BaseApi } from "../BaseApi";

export class FreezersApi extends BaseApi {
  public getFreezers(query: any) {
    return this.get("Freezers/GetAll", {
      query,
    });
  }

  public createFreezer(json: any) {
    return this.post("Freezers/Create", {
      json,
    });
  }
}
