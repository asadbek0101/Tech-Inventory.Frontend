import { BaseApi } from "../BaseApi";

export class CabelApi extends BaseApi {
  public getCabels(query: any) {
    return this.get("Cables/GetAll", {
      query,
    });
  }

  public getOneCabel(query: any) {
    return this.get("Cables/GetOne", {
      query,
    });
  }

  public createCabel(json: any) {
    return this.post("Cables/Create", {
      json,
    });
  }

  public updateCabel(json: any) {
    return this.put("Cables/Update", {
      json,
    });
  }

  public deleteCabel(query: any) {
    return this.delete("Cables/Delete", {
      query,
    });
  }
}
