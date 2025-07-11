import { BaseApi } from "../BaseApi";
import { GluesInitialProps } from "./GluesDto";

export class GluesApi extends BaseApi {
  public getGlues(query: any) {
    return this.get("Glues/GetAll", {
      query,
    });
  }

  public getOneGlue(query: any) {
    return this.get("Glues/GetOne", {
      query,
    });
  }

  public createGlue(json: GluesInitialProps) {
    return this.post("Glues/Create", {
      json,
    });
  }

  public updateGlue(json: any) {
    return this.put("Glues/Update", {
      json,
    });
  }

  public deleteGlue(query: any) {
    return this.delete("Glues/Delete", {
      query,
    });
  }
}
