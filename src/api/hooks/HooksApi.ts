import { BaseApi } from "../BaseApi";
import { HooksInitialProps } from "./HooksDto";

export class HooksApi extends BaseApi {
  public getHooks(query: any) {
    return this.get("Hooks/GetAll", {
      query,
    });
  }

  public getOneHook(query: any) {
    return this.get("Hooks/GetOne", {
      query,
    });
  }

  public createHook(json: HooksInitialProps) {
    return this.post("Hooks/Create", {
      json,
    });
  }

  public updateHook(json: any) {
    return this.put("Hooks/Update", {
      json,
    });
  }

  public deleteHook(query: any) {
    return this.delete("Hooks/Delete", {
      query,
    });
  }
}
