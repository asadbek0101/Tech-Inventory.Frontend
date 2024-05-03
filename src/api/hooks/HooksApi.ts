import { BaseApi } from "../BaseApi";
import { HooksInitialProps } from "./HooksDto";

export class HooksApi extends BaseApi {
  public getHooks(query: any) {
    return this.get("Hooks/GetAll", {
      query,
    });
  }

  public createHook(json: HooksInitialProps) {
    return this.post("Hooks/Create", {
      json,
    });
  }
}
