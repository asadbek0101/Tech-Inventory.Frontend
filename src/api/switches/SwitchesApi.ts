import { BaseApi } from "../BaseApi";

export class SwitchesApi extends BaseApi {
  public getSwitches(query: any) {
    return this.get("Switches/GetAll", {
      query,
    });
  }

  public getOneSwitch(query: any) {
    return this.get("Switches/GetOne", {
      query,
    });
  }

  public createSwitch(json: any) {
    return this.post("Switches/Create", {
      json,
    });
  }

  public updateSwitch(json: any) {
    return this.put("Switches/Update", {
      json,
    });
  }

  public deleteSwitch(query: any) {
    return this.delete("Switches/Delete", {
      query,
    });
  }
}
