export interface ModelsProps {
  readonly name: string;
  readonly info: string;
  readonly type: number;
}

export interface GetAllModelsQuery {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly searchValue: string | null;
  readonly type: number | null;
}

export interface GetOneModelQuery {
  readonly id: number;
}

export interface GetModelsListQuery {
  readonly type: ModelTypes;
}

export enum ModelTypes {
  All = 1,
  Switch = 2,
  Svetafor = 3,
  TerminalServer = 4,
  Stabilizer = 5,
  Camera = 6,
  Projector = 7,
  Avtomat = 8,
  Cabel = 9,
  Stanchion = 10,
  Socket = 11,
  SpeedChecking = 12,
  Ups = 13,
  FTTX = 14,
  GPON = 15,
  Box = 16,
  Bracket = 17,
  Counter = 18,
  VideoRecorder = 19,
}
