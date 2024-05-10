import { BaseApi } from "../BaseApi";

export class ShellsApi extends BaseApi {
  public getShells(query: any) {
    return this.get("Shells/GetAll", {
      query,
    });
  }

  public getOneShell(query: any) {
    return this.get("Shells/GetOne", {
      query,
    });
  }

  public createShell(json: any) {
    return this.post("Shells/Create", {
      json,
    });
  }

  public updateShell(json: any) {
    return this.put("Shells/Update", {
      json,
    });
  }

  public deleteShell(query: any) {
    return this.delete("Shells/Delete", {
      query,
    });
  }
}
