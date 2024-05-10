import { BaseApi } from "../BaseApi";

export class ProjectorApi extends BaseApi {
  public getProjectors(query: any) {
    return this.get("Projectors/GetAll", {
      query,
    });
  }

  public getOneProjector(query: any) {
    return this.get("Projectors/GetOne", {
      query,
    });
  }

  public createProjector(json: any) {
    return this.post("Projectors/Create", {
      json,
    });
  }

  public updateProjector(json: any) {
    return this.put("Projectors/Update", {
      json,
    });
  }

  public deleteProjector(query: any) {
    return this.delete("Projectors/Delete", {
      query,
    });
  }
}
