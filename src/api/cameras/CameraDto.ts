export interface CameraInitialProps {
  readonly obyektId: number;
  readonly modelId: number;
  readonly serialNumber: string;
  readonly ip: string;
  readonly status: string;
  readonly info: string;
  readonly cameraType: CameraTypes;
}

export enum CameraTypes {
  Camera = 1,
  Radar = 2,
  ANPR = 3,
  PTZ = 4,
  C327 = 5,
  CHQBA = 6,
  C733 = 7,
}
