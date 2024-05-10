import { BaseApi } from "../BaseApi";

export class VideoRecorderApi extends BaseApi {
  public getVideoRecorders(query: any) {
    return this.get("VideoRecorders/GetAll", {
      query,
    });
  }

  public getOneVideoRecorder(query: any) {
    return this.get("VideoRecorders/GetOne", {
      query,
    });
  }

  public createVideoRecorder(json: any) {
    return this.post("VideoRecorders/Create", {
      json,
    });
  }

  public updateVideoRecorder(json: any) {
    return this.put("VideoRecorders/Update", {
      json,
    });
  }

  public deleteVideoRecorder(query: any) {
    return this.delete("VideoRecorders/Delete", {
      query,
    });
  }
}
