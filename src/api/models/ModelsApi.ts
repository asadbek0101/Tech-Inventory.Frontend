import { BaseApi } from "../BaseApi";
import { GetAllModelsQuery, GetModelsListQuery, GetOneModelQuery } from "./ModelsDto";

export class ModelsApi extends BaseApi {
  public getModels(query: GetAllModelsQuery) {
    return this.get("Models/GetAll", { query });
  }

  public getOneModel(query: GetOneModelQuery) {
    return this.get("Models/GetOne", { query });
  }

  public getModelsList(query: GetModelsListQuery) {
    return this.get("Models/GetList", { query });
  }

  public createModel(json: any) {
    return this.post("Models/Create", { json });
  }

  public updateModel(json: any) {
    return this.put("Models/Update", { json });
  }
}
