import { BaseApi } from "../BaseApi";

export class BoxesApi extends BaseApi {
  public getBoxes(query: any) {
    return this.get("Boxes/GetAll", {
      query,
    });
  }

  public getOneBoxe(query: any) {
    return this.get("Boxes/GetOne", {
      query,
    });
  }

  public createBox(json: any) {
    return this.post("Boxes/Create", {
      json,
    });
  }

  public updateBox(json: any) {
    return this.put("Boxes/Update", {
      json,
    });
  }

  public deleteBox(query: any) {
    return this.delete("Boxes/Delete", {
      query,
    });
  }
}
