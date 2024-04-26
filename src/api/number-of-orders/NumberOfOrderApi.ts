import { BaseApi } from "../BaseApi";

export class NumberOfOrdersApi extends BaseApi {
  public getNumberOfOrders(query: any) {
    return this.get("NumberOfOrders/GetAll", {
      query,
    });
  }

  public getNumberOfOrdersList(query: any) {
    return this.get("NumberOfOrders/GetList", {
      query,
    });
  }

  public cretaeNumberOfOrder(json: any) {
    return this.post("NumberOfOrders/Create", {
      json,
    });
  }
}
