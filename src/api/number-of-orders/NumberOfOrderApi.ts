import { BaseApi } from "../BaseApi";

export class NumberOfOrdersApi extends BaseApi {
  public getNumberOfOrders(query: any) {
    return this.get("NumberOfOrders/GetAll", {
      query,
    });
  }

  public getOneNumberOfOrder(query: any) {
    return this.get("NumberOfOrders/GetOne", {
      query,
    });
  }

  public getNumberOfOrdersList(query: any) {
    return this.get("NumberOfOrders/GetList", {
      query,
    });
  }

  public createNumberOfOrder(json: any) {
    return this.post("NumberOfOrders/Create", {
      json,
    });
  }

  public updateNumberOfOrder(json: any) {
    return this.put("NumberOfOrders/Update", {
      json,
    });
  }

  public deleteNumberOfOrders(json: any) {
    return this.post("NumberOfOrders/Delete", {
      json,
    });
  }
}
