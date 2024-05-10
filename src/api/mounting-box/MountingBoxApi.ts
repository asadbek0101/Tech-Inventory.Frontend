import { BaseApi } from "../BaseApi";

export class MountingBoxApi extends BaseApi {
  public getMountingBoxs(query: any) {
    return this.get("MountingBoxes/GetAll", {
      query,
    });
  }

  public getOneMountingBox(query: any) {
    return this.get("MountingBoxes/GetOne", {
      query,
    });
  }

  public createMountingBox(json: any) {
    return this.post("MountingBoxes/Create", {
      json,
    });
  }

  public updateMountingBox(json: any) {
    return this.put("MountingBoxes/Update", {
      json,
    });
  }

  public deleteMountingBox(query: any) {
    return this.delete("MountingBoxes/Delete", {
      query,
    });
  }
}
