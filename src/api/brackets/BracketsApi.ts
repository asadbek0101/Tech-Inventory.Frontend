import { BaseApi } from "../BaseApi";

export class BracketsApi extends BaseApi {
  public getBrackets(query: any) {
    return this.get("Brackets/GetAll", {
      query,
    });
  }

  public getOneBracket(query: any) {
    return this.get("Brackets/GetOne", {
      query,
    });
  }

  public createBracket(json: any) {
    return this.post("Brackets/Create", {
      json,
    });
  }

  public updateBracket(json: any) {
    return this.put("Brackets/Update", {
      json,
    });
  }

  public deleteBracket(query: any) {
    return this.delete("Brackets/Delete", {
      query,
    });
  }
}
