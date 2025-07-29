import { BaseApi } from "../BaseApi";

export class DashboardApi extends BaseApi {
  public getObjects(query: any) {
    return this.get("Dashboard/GetObjects", { query });
  }

  public getUsers() {
    return this.get("Dashboard/GetUsers");
  }
}
