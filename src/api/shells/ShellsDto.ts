export interface ShellInitialProps {
  readonly obyektId: number;
  readonly meter: string;
  readonly info?: string;
  readonly shellType: ShellTypes;
}

export enum ShellTypes {
  GofraShell = 1,
  PlasticShell = 2,
}
