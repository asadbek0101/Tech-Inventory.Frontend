export interface RegionsProps {
  readonly name: string;
  readonly info?: string;
}

export interface GetAllRegionsQuery {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly searchValue: string;
}

export interface GetOneRegionQuery {
  readonly id: number;
}

export interface DeleteRegionsQuery {
  readonly regionIds: number[];
}
