import { BaseApi } from "../BaseApi";

export class AkumalatorApi extends BaseApi {
  public getAkumalators(query: any) {
    return this.get("Akumalators/GetAll", {
      query,
    });
  }

  public createAkumalator(json: any) {
    return this.post("Akumalators/Create", {
      json,
    });
  }
}
