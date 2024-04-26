import { BaseApi } from "../BaseApi";

export class ProjectsApi extends BaseApi {
  public getProjects(query: any) {
    return this.get("Projects/GetAll", {
      query,
    });
  }

  public getProjectsList() {
    return this.get("Projects/GetList");
  }

  public getOneProject(id: any) {
    return this.get("Projects/GetOne", {
      query: { type: 10, id },
    });
  }

  public createProject(json: any) {
    return this.post("Projects/Create", {
      json: { ...json, type: 10 },
    });
  }

  public deleteProjects(json: any) {
    return this.post("Projects/Delete", {
      json: { ...json, type: 10 },
    });
  }

  public updateProject(json: any) {
    return this.put("Projects/Update", {
      json: { ...json, type: 10 },
    });
  }
}
