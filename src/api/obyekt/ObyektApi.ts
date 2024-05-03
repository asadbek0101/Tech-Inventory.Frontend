import { BaseApi } from "../BaseApi";

export class ObyektApi extends BaseApi {
  public getObyekts(query: any) {
    return this.get("Obyekts/GetAll", {
      query,
    });
  }

  public getObyektProducts(query: any) {
    return this.get("Obyekts/GetProducts", {
      query,
    });
  }

  public getOneObyekt(query: any) {
    return this.get("Obyekts/GetOne", {
      query,
    });
  }

  public getRegionsList() {
    return this.get("Regions/GetList");
  }

  public createObyekt(json: any) {
    return this.post("Obyekts/Create", {
      json,
    });
  }

  public createConnectionType(json: any) {
    return this.post("ConnectionTypes/Create", {
      json,
    });
  }

  public updateConnectionType(json: any) {
    return this.put("ConnectionTypes/Update", {
      json,
    });
  }

  public updateObyekt(json: any) {
    return this.put("Obyekts/Update", {
      json,
    });
  }

  public deleteObyekts(json: any) {
    return this.post("Obyekts/Delete", {
      json,
    });
  }

  public uploadFiles(json: any, query: any) {
    return this.post("Files/UploadFile", {
      query,
      json,
    });
  }

  public getObyektReport(id: number, fileName: string) {
    return this.downloadPdf("Pdf/GetObyektReport", fileName, { query: { id } });
  }

  public getMultiFile(path: string, fileName: string, type: string) {
    return this.downloadFile("Files/DownloadFile", fileName, type, { query: { fileName: path } });
  }
}
