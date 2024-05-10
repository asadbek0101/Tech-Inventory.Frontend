import { BaseApi } from "../BaseApi";

export class ShelfApi extends BaseApi {
  public getShelves(query: any) {
    return this.get("Shelf/GetAll", {
      query,
    });
  }

  public getOneShelf(query: any) {
    return this.get("Shelf/GetOne", {
      query,
    });
  }

  public createShelf(json: any) {
    return this.post("Shelf/Create", {
      json,
    });
  }

  public updateShelf(json: any) {
    return this.put("Shelf/Update", {
      json,
    });
  }

  public deleteShelf(query: any) {
    return this.delete("Shelf/Delete", {
      query,
    });
  }
}
