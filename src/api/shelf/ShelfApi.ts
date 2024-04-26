import { BaseApi } from "../BaseApi";

export class ShelfApi extends BaseApi {
  public getShelves(query: any) {
    return this.get("Shelf/GetAll", {
      query,
    });
  }

  public createShelf(json: any) {
    return this.post("Shelf/Create", {
      json,
    });
  }
}
