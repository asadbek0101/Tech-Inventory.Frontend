import { BaseApi } from "../BaseApi";

export class AttachmentsApi extends BaseApi {
  public getAttachments(query: any) {
    return this.get("Attachments/GetAll", {
      query,
    });
  }

  public createAttachment(json: any) {
    return this.post("Attachments/Create", {
      json,
    });
  }
}
