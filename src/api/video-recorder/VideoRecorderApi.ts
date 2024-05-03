import { BaseApi } from "../BaseApi";

export class VideoRecorderApi extends BaseApi {
  public getVideoRecorders(query: any) {
    return this.get("VideoRecorders/GetAll", {
      query,
    });
  }

  public createVideoRecorder(json: any) {
    return this.post("VideoRecorders/Create", {
      json,
    });
  }
}
