export interface UserProps{
    readonly Email: string
}

export interface GetAllUsersProps{
    readonly pageNumber: number;
    readonly pageSize: number;
    readonly status?: string;
    readonly searchValue?: string;
}

export interface CreateUserProps{
    readonly email: string;
    readonly userName: string;
    readonly roleName: string;
    readonly password: string;
}