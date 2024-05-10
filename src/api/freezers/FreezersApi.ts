import { BaseApi } from "../BaseApi";

export class FreezersApi extends BaseApi {
  public getFreezers(query: any) {
    return this.get("Freezers/GetAll", {
      query,
    });
  }

  public getOneFreezer(query: any) {
    return this.get("Freezers/GetOne", {
      query,
    });
  }

  public createFreezer(json: any) {
    return this.post("Freezers/Create", {
      json,
    });
  }

  public updateFreezer(json: any) {
    return this.put("Freezers/Update", {
      json,
    });
  }

  public deleteFreezer(query: any) {
    return this.delete("Freezers/Delete", {
      query,
    });
  }
}
