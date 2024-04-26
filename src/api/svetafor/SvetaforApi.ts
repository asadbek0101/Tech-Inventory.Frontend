import { BaseApi } from "../BaseApi";

export class SvetaforApi extends BaseApi {
  public getSvetafors(query: any) {
    return this.get("Svetafors/GetAll", {
      query,
    });
  }

  public createSvetafor(json: any) {
    return this.post("Svetafors/Create", {
      json,
    });
  }
}
