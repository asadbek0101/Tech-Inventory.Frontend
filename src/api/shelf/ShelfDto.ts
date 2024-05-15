export interface ShelfInitialProps {
  readonly obyektId: number;
  readonly brandId: number;
  readonly info: string;
  readonly serialNumber: string;
  readonly number: string;
  readonly shelfType: ShelfTypes;
}

export enum ShelfTypes {
  CentralTelecommunicationShelf = 1,
  TelecommunicationShelf = 2,
  MainElectronicShelf = 3,
  DistributionShelf = 4,
}
