export interface SvetaforInitialProps {
  readonly obyektId: number;
  readonly modelId: number;
  readonly name: string;
  readonly countOfPorts: string;
  readonly info: string;
  readonly svetaforType: SvetaforTypes;
}

export enum SvetaforTypes {
  SvetaforDetector = 1,
  SvetaforDetectorForCamera = 2,
}
