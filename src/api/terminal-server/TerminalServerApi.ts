import { BaseApi } from "../BaseApi";

export class TerminalServerApi extends BaseApi {
  public getTerminalServers(query: any) {
    return this.get("TerminalServers/GetAll", {
      query,
    });
  }

  public getOneTerminalServer(query: any) {
    return this.get("TerminalServers/GetOne", {
      query,
    });
  }

  public createTerminalServer(json: any) {
    return this.post("TerminalServers/Create", {
      json,
    });
  }

  public updateTerminalServer(json: any) {
    return this.put("TerminalServers/Update", {
      json,
    });
  }

  public deleteTerminalServer(query: any) {
    return this.delete("TerminalServers/Delete", {
      query,
    });
  }
}
