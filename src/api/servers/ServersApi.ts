import { BaseApi } from "../BaseApi";

export class ServersApi extends BaseApi {
  public getServers(query: any) {
    return this.get("Servers/GetAll", {
      query,
    });
  }

  public getOneServer(query: any) {
    return this.get("Servers/GetOne", {
      query,
    });
  }

  public createServer(json: any) {
    return this.post("Servers/Create", {
      json,
    });
  }

  public updateServer(json: any) {
    return this.put("Servers/Update", {
      json,
    });
  }

  public deleteServer(query: any) {
    return this.delete("Servers/Delete", {
      query,
    });
  }
}
