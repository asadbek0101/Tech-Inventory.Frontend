import { BaseApi } from "../BaseApi";

export class RackesApi extends BaseApi {
  public getRackes(query: any) {
    return this.get("Racks/GetAll", {
      query,
    });
  }

  public getOneRack(query: any) {
    return this.get("Racks/GetOne", {
      query,
    });
  }

  public createRack(json: any) {
    return this.post("Racks/Create", {
      json,
    });
  }

  public updateRack(json: any) {
    return this.put("Racks/Update", {
      json,
    });
  }

  public deleteRack(query: any) {
    return this.delete("Racks/Delete", {
      query,
    });
  }
}
