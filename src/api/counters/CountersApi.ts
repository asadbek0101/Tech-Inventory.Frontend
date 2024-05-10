import { BaseApi } from "../BaseApi";

export class CountersApi extends BaseApi {
  public getCounters(query: any) {
    return this.get("Counters/GetAll", {
      query,
    });
  }

  public getOneCounter(query: any) {
    return this.get("Counters/GetOne", {
      query,
    });
  }

  public createCounter(json: any) {
    return this.post("Counters/Create", {
      json,
    });
  }

  public updateCounter(json: any) {
    return this.put("Counters/Update", {
      json,
    });
  }

  public deleteCounter(query: any) {
    return this.delete("Counters/Delete", {
      query,
    });
  }
}
