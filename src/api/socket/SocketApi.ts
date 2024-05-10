import { BaseApi } from "../BaseApi";

export class SocketApi extends BaseApi {
  public getSockets(query: any) {
    return this.get("Sockets/GetAll", {
      query,
    });
  }

  public getOneSocket(query: any) {
    return this.get("Sockets/GetOne", {
      query,
    });
  }

  public createSocket(json: any) {
    return this.post("Sockets/Create", {
      json,
    });
  }

  public updateSocket(json: any) {
    return this.put("Sockets/Update", {
      json,
    });
  }

  public deleteSocket(query: any) {
    return this.delete("Sockets/Delete", {
      query,
    });
  }
}
