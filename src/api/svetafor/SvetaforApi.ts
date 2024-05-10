import { BaseApi } from "../BaseApi";

export class SvetaforApi extends BaseApi {
  public getSvetafors(query: any) {
    return this.get("Svetafors/GetAll", {
      query,
    });
  }

  public getOneSvetafor(query: any) {
    return this.get("Svetafors/GetOne", {
      query,
    });
  }

  public createSvetafor(json: any) {
    return this.post("Svetafors/Create", {
      json,
    });
  }

  public updateSvetafor(json: any) {
    return this.put("Svetafors/Update", {
      json,
    });
  }

  public deleteSvetafor(query: any) {
    return this.delete("Svetafors/Delete", {
      query,
    });
  }
}
