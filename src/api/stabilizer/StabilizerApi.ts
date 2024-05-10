import { BaseApi } from "../BaseApi";

export class StabilizerApi extends BaseApi {
  public getStabilizers(query: any) {
    return this.get("Stabilizers/GetAll", {
      query,
    });
  }

  public getOneStabilizer(query: any) {
    return this.get("Stabilizers/GetOne", {
      query,
    });
  }

  public createStabilizer(json: any) {
    return this.post("Stabilizers/Create", {
      json,
    });
  }

  public updateStabilizer(json: any) {
    return this.put("Stabilizers/Update", {
      json,
    });
  }

  public deleteStabilizer(query: any) {
    return this.delete("Stabilizers/Delete", {
      query,
    });
  }
}
