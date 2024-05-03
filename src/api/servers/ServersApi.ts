import { BaseApi } from "../BaseApi";

export class ServersApi extends BaseApi {
  public getServers(query: any) {
    return this.get("Servers/GetAll", {
      query,
    });
  }

  public createServer(json: any) {
    return this.post("Servers/Create", {
      json,
    });
  }
}
