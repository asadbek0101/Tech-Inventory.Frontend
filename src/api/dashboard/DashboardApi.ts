import { BaseApi } from "../BaseApi";

export class DashboardApi extends BaseApi {
  public getGetAll() {
    return this.get("Dashboard/GetAll");
  }
}
