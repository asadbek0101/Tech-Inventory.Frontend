import { BaseApi } from "../BaseApi";

export class StabilizerApi extends BaseApi {
  public getStabilizers(query: any) {
    return this.get("Stabilizers/GetAll", {
      query,
    });
  }

  public createStabilizer(json: any) {
    return this.post("Stabilizers/Create", {
      json,
    });
  }
}
