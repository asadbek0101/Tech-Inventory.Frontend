import { BaseApi } from "../BaseApi";

export class StanchionsApi extends BaseApi {
  public getStanchions(query: any) {
    return this.get("Stanchions/GetAll", {
      query,
    });
  }

  public getOneStanchion(query: any) {
    return this.get("Stanchions/GetOne", {
      query,
    });
  }

  public createStanchion(json: any) {
    return this.post("Stanchions/Create", {
      json,
    });
  }

  public updateStanchion(json: any) {
    return this.put("Stanchions/Update", {
      json,
    });
  }

  public deleteStanchion(query: any) {
    return this.delete("Stanchions/Delete", {
      query,
    });
  }
}
