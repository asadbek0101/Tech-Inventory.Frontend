import { BaseApi } from "../BaseApi";

export class AvtomatApi extends BaseApi {
  public getAvtomats(query: any) {
    return this.get("Avtomats/GetAll", {
      query,
    });
  }

  public getOneAvtomat(query: any) {
    return this.get("Avtomats/GetOne", {
      query,
    });
  }

  public createAvtomat(json: any) {
    return this.post("Avtomats/Create", {
      json,
    });
  }

  public updateAvtomat(json: any) {
    return this.put("Avtomats/Update", {
      json,
    });
  }

  public deleteAvtomat(query: any) {
    return this.delete("Avtomats/Delete", {
      query,
    });
  }
}
