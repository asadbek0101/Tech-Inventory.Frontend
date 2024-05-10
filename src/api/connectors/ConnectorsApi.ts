import { BaseApi } from "../BaseApi";

export class ConnectorsApi extends BaseApi {
  public getConnectors(query: any) {
    return this.get("Connectors/GetAll", {
      query,
    });
  }

  public getOneConnector(query: any) {
    return this.get("Connectors/GetOne", {
      query,
    });
  }

  public createConnector(json: any) {
    return this.post("Connectors/Create", {
      json,
    });
  }

  public updateConnector(json: any) {
    return this.put("Connectors/Update", {
      json,
    });
  }

  public deleteConnector(query: any) {
    return this.delete("Connectors/Delete", {
      query,
    });
  }
}
