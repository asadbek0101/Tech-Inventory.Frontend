import { BaseApi } from "../BaseApi";

export class SwitchesApi extends BaseApi {
  public getSwitches(query: any) {
    return this.get("Switches/GetAll", {
      query,
    });
  }

  public createSwitch(json: any) {
    return this.post("Switches/Create", {
      json,
    });
  }
}
