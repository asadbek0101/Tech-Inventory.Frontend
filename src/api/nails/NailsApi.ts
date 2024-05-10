import { BaseApi } from "../BaseApi";

export class NailsApi extends BaseApi {
  public getNails(query: any) {
    return this.get("Nails/GetAll", {
      query,
    });
  }

  public getOneNail(query: any) {
    return this.get("Nails/GetOne", {
      query,
    });
  }

  public createNail(json: any) {
    return this.post("Nails/Create", {
      json,
    });
  }

  public updateNail(json: any) {
    return this.put("Nails/Update", {
      json,
    });
  }

  public deleteNail(query: any) {
    return this.delete("Nails/Delete", {
      query,
    });
  }
}
