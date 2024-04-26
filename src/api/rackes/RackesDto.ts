export interface RackesInitialProps {
  readonly obyektId: number;
  readonly numberOfFibers: string;
  readonly typeOfAdapter: string;
  readonly countOfPorts: string;
  readonly info: string;
  readonly rackType: RackTypes;
}

export enum RackTypes {
  ODFOpticRack = 1,
  MiniOpticRack = 2,
}
