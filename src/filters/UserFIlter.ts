import { AppFilter, AppFilterProps } from "./AppFilter";

export enum UserFilterTabs {
  UserTable = "user-table",
  UserForm = "user-form",
}

interface UserFilterProps extends AppFilterProps<UserFilterTabs> {
  readonly userTabType?: UserFilterTabs;
  readonly userType?: string;
  readonly userId?: string;
}

export class UserFilter extends AppFilter<UserFilterTabs> {
  private readonly userTabType: UserFilterTabs;
  private readonly userType: string;
  private readonly userId: string;
  public constructor({ userTabType, userId, userType, ...props } = {} as UserFilterProps) {
    super({ ...props });
    this.userTabType = userTabType || UserFilterTabs.UserTable;
    this.userId = userId || "";
    this.userType = userType || "";
  }

  public getUserTabType() {
    return this.userTabType;
  }

  public getUserType() {
    return this.userType;
  }

  public getUserId() {
    return this.userId;
  }

  public getAllUsersFilter() {
    return {
      pageNumber: this.pageCount,
      pageSize: this.perPage,
      userId: 1,
      status: this.status,
    };
  }
}
