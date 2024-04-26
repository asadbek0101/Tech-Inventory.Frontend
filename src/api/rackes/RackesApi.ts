import { BaseApi } from "../BaseApi";

export class RackesApi extends BaseApi {
  public getRackes(query: any) {
    return this.get("Racks/GetAll", {
      query,
    });
  }

  public createRack(json: any) {
    return this.post("Racks/Create", {
      json,
    });
  }
}
