import { BaseApi } from "../BaseApi";

export class BoxesApi extends BaseApi {
  public getBoxes(query: any) {
    return this.get("Boxes/GetAll", {
      query,
    });
  }

  public createBox(json: any) {
    return this.post("Boxes/Create", {
      json,
    });
  }
}
