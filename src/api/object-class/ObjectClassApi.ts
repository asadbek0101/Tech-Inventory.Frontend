import { BaseApi } from "../BaseApi";

export class ObjectClassApi extends BaseApi {
  public getObjectClasses(query: any) {
    return this.get("ObjectClasses/GetList", {
      query,
    });
  }

  public getObjectClassTypes() {
    return this.get("ObjectClasses/GetList");
  }
}
