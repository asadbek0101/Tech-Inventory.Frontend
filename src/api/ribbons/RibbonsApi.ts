import { BaseApi } from "../BaseApi";

export class RibbonsApi extends BaseApi {
  public getRibbons(query: any) {
    return this.get("Ribbons/GetAll", {
      query,
    });
  }

  public createRibbon(json: any) {
    return this.post("Ribbons/Create", {
      json,
    });
  }
}
