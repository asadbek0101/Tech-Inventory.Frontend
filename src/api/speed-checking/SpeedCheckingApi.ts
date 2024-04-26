import { BaseApi } from "../BaseApi";

export class SpeedCheckingApi extends BaseApi {
  public getSpeedCheckings(query: any) {
    return this.get("SpeedCheckings/GetAll", {
      query,
    });
  }

  public createSpeedChecking(json: any) {
    return this.post("SpeedCheckings/Create", {
      json,
    });
  }
}
