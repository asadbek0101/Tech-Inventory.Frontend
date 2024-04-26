export interface CabelInitialProps {
  readonly obyektId: number;
  readonly cabelTypeId: number | any;
  readonly modelId: number;
  readonly meter: string;
  readonly info: string;
  readonly cabelType: CabelTypes;
}
export enum CabelTypes {
  ElectricCable = 1,
  UTPable = 2,
}
