import { BaseApi } from "../BaseApi";

export class TerminalServerApi extends BaseApi {
  public getTerminalServers(query: any) {
    return this.get("TerminalServers/GetAll", {
      query,
    });
  }

  public createTerminalServer(json: any) {
    return this.post("TerminalServers/Create", {
      json,
    });
  }
}
