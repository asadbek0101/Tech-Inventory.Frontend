import { BaseApi } from "../BaseApi";

export class BracketsApi extends BaseApi {
  public getBrackets(query: any) {
    return this.get("Brackets/GetAll", {
      query,
    });
  }

  public createBracket(json: any) {
    return this.post("Brackets/Create", {
      json,
    });
  }
}
