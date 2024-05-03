import { BaseApi } from "../BaseApi";

export class ConnectorsApi extends BaseApi {
  public getConnectors(query: any) {
    return this.get("Connectors/GetAll", {
      query,
    });
  }

  public createConnector(json: any) {
    return this.post("Connectors/Create", {
      json,
    });
  }
}
