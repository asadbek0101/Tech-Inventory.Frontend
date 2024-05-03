import { BaseApi } from "../BaseApi";

export class CountersApi extends BaseApi {
  public getCounters(query: any) {
    return this.get("Counters/GetAll", {
      query,
    });
  }

  public createCounter(json: any) {
    return this.post("Counters/Create", {
      json,
    });
  }
}
