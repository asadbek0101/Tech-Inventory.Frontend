import { BaseApi } from "../BaseApi";

export class CameraApi extends BaseApi {
  public getCameras(query: any) {
    return this.get("Cameras/GetAll", {
      query,
    });
  }

  public getOneCamera(query: any) {
    return this.get("Cameras/GetOne", {
      query,
    });
  }

  public createCamera(json: any) {
    return this.post("Cameras/Create", {
      json,
    });
  }

  public updateCamera(json: any) {
    return this.put("Cameras/Update", {
      json,
    });
  }

  public deleteCamera(query: any) {
    return this.delete("Cameras/Delete", {
      query,
    });
  }
}
