import { BaseApi } from "../BaseApi";

export class CameraApi extends BaseApi {
  public getCameras(query: any) {
    return this.get("Cameras/GetAll", {
      query,
    });
  }

  public createCamera(json: any) {
    return this.post("Cameras/Create", {
      json,
    });
  }
}
