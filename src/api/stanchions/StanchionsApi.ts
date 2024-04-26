import { BaseApi } from "../BaseApi";

export class StanchionsApi extends BaseApi {
  public getStanchions(query: any) {
    return this.get("Stanchions/GetAll", {
      query,
    });
  }

  public createStanchion(json: any) {
    return this.post("Stanchions/Create", {
      json,
    });
  }
}
