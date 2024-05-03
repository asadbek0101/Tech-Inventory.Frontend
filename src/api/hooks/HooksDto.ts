export interface HooksInitialProps {
  readonly obyektId: number;
  readonly count: string;
  readonly info: string;
  readonly hookType: HookTypes;
}

export enum HookTypes {
  SipHook = 1,
  CabelHook = 2,
}
