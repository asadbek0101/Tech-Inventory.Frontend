import { BaseApi } from "../BaseApi";

export class ObyektApi extends BaseApi {
  public getObyekts(query: any) {
    return this.get("Obyekts/GetAll", {
      query,
    });
  }

  public getObyektLocations(query: any) {
    return this.get("Obyekts/GetLocations", { query });
  }

  public getOneObyekt(query: any) {
    return this.get("Obyekts/GetOne", {
      query,
    });
  }

  public getObyektReportForPdf(query: any) {
    return this.get("Obyekts/GetObyektReport", {
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

  public updateFile(json: any) {
    return this.put("Files/UpdateFile", {
      json,
    });
  }

  public getObyektReport(id: number, fileName: string) {
    return this.downloadPdf("Pdf/GetObyektReport", fileName, { query: { id } });
  }

  public getMultiFile(token: string, originalFileName: string) {
    return this.downloadFile(`Attachments/Download?token=${token}`, originalFileName);
  }

  public updateAttachment(query: any) {
    return this.put(`Attachments/Update`, { query });
  }

  public deleteFile(query: any) {
    return this.delete(`Attachments/Delete`, { query });
  }
}
