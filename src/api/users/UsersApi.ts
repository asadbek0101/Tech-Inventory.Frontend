import { BaseApi } from "../BaseApi";
import { CreateUserProps, GetAllUsersProps } from "./UsersDto";

export class UsersApi extends BaseApi {
  public getAllUsers(query: GetAllUsersProps) {
    return this.get("Users/GetAll", {
      query,
    });
  }

  public getUsersList() {
    return this.get("Users/GetList");
  }

  public getOneUser(id: number) {
    return this.get("Users/GetOne", {
      query: { id },
    });
  }

  public getRolesList() {
    return this.get("Roles/GetList");
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
