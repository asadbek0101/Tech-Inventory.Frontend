import { BaseApi } from "../BaseApi";

export class ShellsApi extends BaseApi {
  public getShells(query: any) {
    return this.get("Shells/GetAll", {
      query,
    });
  }

  public createShell(json: any) {
    return this.post("Shells/Create", {
      json,
    });
  }
}
