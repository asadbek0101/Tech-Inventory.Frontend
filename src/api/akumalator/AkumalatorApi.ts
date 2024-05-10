import { BaseApi } from "../BaseApi";

export class AkumalatorApi extends BaseApi {
  public getAkumalators(query: any) {
    return this.get("Akumalators/GetAll", {
      query,
    });
  }

  public getOneAkumalator(query: any) {
    return this.get("Akumalators/GetOne", {
      query,
    });
  }

  public createAkumalator(json: any) {
    return this.post("Akumalators/Create", {
      json,
    });
  }

  public updateAkumalator(json: any) {
    return this.put("Akumalators/Update", {
      json,
    });
  }

  public deleteAkumalator(query: any) {
    return this.delete("Akumalators/Delete", {
      query,
    });
  }
}
