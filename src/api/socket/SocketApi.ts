import { BaseApi } from "../BaseApi";

export class SocketApi extends BaseApi {
  public getSockets(query: any) {
    return this.get("Sockets/GetAll", {
      query,
    });
  }

  public createSocket(json: any) {
    return this.post("Sockets/Create", {
      json,
    });
  }
}
