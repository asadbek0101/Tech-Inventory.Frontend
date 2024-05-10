import { BaseApi } from "../BaseApi";

export class ObjectClassTypeApi extends BaseApi {
  public getObjectClassTypes(query: any) {
    return this.get("ObjectClassTypes/GetAll", {
      query,
    });
  }

  public getObjectClassTypesList() {
    return this.get("ObjectClassTypes/GetList");
  }

  public getOneObjectClassType(query: any) {
    return this.get("ObjectClassTypes/GetOne", {
      query,
    });
  }

  public createObjectClassType(json: any) {
    return this.post("ObjectClassTypes/Create", {
      json,
    });
  }

  public updateObjectClassType(json: any) {
    return this.put("ObjectClassTypes/Update", {
      json,
    });
  }

  public deleteObjectClassTypes(json: any) {
    return this.post("ObjectClassTypes/Delete", {
      json,
    });
  }
}
