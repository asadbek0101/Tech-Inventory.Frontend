import { BaseApi } from "../BaseApi";

export class SpeedCheckingApi extends BaseApi {
  public getSpeedCheckings(query: any) {
    return this.get("SpeedCheckings/GetAll", {
      query,
    });
  }

  public getOneSpeedChecking(query: any) {
    return this.get("SpeedCheckings/GetOne", {
      query,
    });
  }

  public createSpeedChecking(json: any) {
    return this.post("SpeedCheckings/Create", {
      json,
    });
  }

  public updateSpeedChecking(json: any) {
    return this.put("SpeedCheckings/Update", {
      json,
    });
  }

  public deleteSpeedChecking(query: any) {
    return this.delete("SpeedCheckings/Delete", {
      query,
    });
  }
}
