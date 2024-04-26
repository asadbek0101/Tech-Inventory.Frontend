export interface SwitchInitialProps {
  readonly obyektId: number;
  readonly modelId: number;
  readonly countOfPorts: string;
  readonly info: string;
  readonly switchType: SwitchTypes;
}

export enum SwitchTypes {
  SwitchCombo = 1,
  SwitchPoE = 2,
}
