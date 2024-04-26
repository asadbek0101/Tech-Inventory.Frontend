import { BaseApi } from "../BaseApi";
import { CreateUserProps, GetAllUsersProps } from "./UsersDto";

export class UsersApi extends BaseApi {
  public getAllUsers(query: GetAllUsersProps) {
    return this.get("Users/GetAll", {
      query,
    });
  }

  public getOneUser(id: number) {
    return this.get("Users/GetOne", {
      query: { id },
    });
  }

  public getAllRoles() {
    return this.get("Role/GetAllRole/:userId", {
      params: { userId: this.userId },
    });
  }

  public createUser(json: CreateUserProps) {
    return this.post("Users/Create", {
      json,
    });
  }

  public updateUser(json: CreateUserProps) {
    return this.put("Users/Update", {
      json,
    });
  }

  public deleteUsers(json: number[]) {
    return this.delete("User/DeleteUsers", {
      json,
    });
  }
}
