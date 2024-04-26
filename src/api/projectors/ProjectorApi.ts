import { BaseApi } from "../BaseApi";

export class ProjectorApi extends BaseApi {
  public getProjectors(query: any) {
    return this.get("Projectors/GetAll", {
      query,
    });
  }

  public createProjector(json: any) {
    return this.post("Projectors/Create", {
      json,
    });
  }
}
