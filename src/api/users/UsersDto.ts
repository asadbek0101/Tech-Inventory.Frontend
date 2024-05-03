export interface UserProps {
  readonly Email: string;
}

export interface GetAllUsersProps {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly status?: string;
  readonly searchValue?: string;
}

export interface CreateUserProps {
  readonly email: string;
  readonly userName: string;
  readonly roleName: string;
  readonly password: string;
}

export interface UserIntialProps {
  readonly id?: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly regionId: number;
  readonly middleName: string;
  readonly userName: string;
  readonly password?: string;
  readonly phoneNumber: string;
  readonly role: string;
  readonly email: string;
  readonly roleName: string;
  readonly image?: string;
}
