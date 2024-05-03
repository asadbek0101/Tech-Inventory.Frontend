import { BaseApi } from "../BaseApi";

export class NailsApi extends BaseApi {
  public getNails(query: any) {
    return this.get("Nails/GetAll", {
      query,
    });
  }

  public createNail(json: any) {
    return this.post("Nails/Create", {
      json,
    });
  }
}
