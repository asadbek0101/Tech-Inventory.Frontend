import { BaseApi } from "../BaseApi";

export class ObjectClassApi extends BaseApi {
  public getObjectClasses(query: any) {
    return this.get("ObjectClasses/GetAll", {
      query,
    });
  }

  public getOneObjectClass(query: any) {
    return this.get("ObjectClasses/GetOne", {
      query,
    });
  }

  public getObjectClassesList(query: any) {
    return this.get("ObjectClasses/GetList", {
      query,
    });
  }

  public createObjectClass(json: any) {
    return this.post("ObjectClasses/Create", {
      json,
    });
  }

  public updateObjectClass(json: any) {
    return this.put("ObjectClasses/Update", {
      json,
    });
  }

  public deleteObjectClasses(json: any) {
    return this.post("ObjectClasses/Delete", {
      json,
    });
  }
}
