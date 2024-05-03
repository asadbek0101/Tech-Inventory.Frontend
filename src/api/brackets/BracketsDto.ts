export interface BracketsInitialProps {
  readonly obyektId: number;
  readonly modelId: number;
  readonly info: string;
  readonly bracketType: BracketTypes;
}

export enum BracketTypes {
  WallBracket = 1,
  PillarBracket = 2,
}
