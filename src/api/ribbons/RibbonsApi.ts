import { BaseApi } from "../BaseApi";

export class RibbonsApi extends BaseApi {
  public getRibbons(query: any) {
    return this.get("Ribbons/GetAll", {
      query,
    });
  }

  public getOneRibbon(query: any) {
    return this.get("Ribbons/GetOne", {
      query,
    });
  }

  public createRibbon(json: any) {
    return this.post("Ribbons/Create", {
      json,
    });
  }

  public updateRibbon(json: any) {
    return this.put("Ribbons/Update", {
      json,
    });
  }

  public deleteRibbon(query: any) {
    return this.delete("Ribbons/Delete", {
      query,
    });
  }
}
