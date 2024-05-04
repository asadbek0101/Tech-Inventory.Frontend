export enum UserRoles {
  // dasturchi
  Programmer = "Programmer",

  // bo'lim bo'shlig'i
  DepartmentHead = "DepartmentHead",

  // bosh mutaxassis
  ChiefSpecialist = "ChiefSpecialist",

  // yetakchi mutaxassis[]
  LeadingExpert = "LeadingExpert",

  // katta mutaxassis
  SeniorSpecialist = "SeniorSpecialist",
}

export enum TabPageType {
  Table = "table",
  Form = "form",
  Details = "details",
  UserResults = "user-results",
}

export enum AppMenuType {
  Opened = "opened",
  Closed = "closed",
}

export enum PositionType {
  Top = "top",
  Left = "left",
  Right = "right",
  Bottom = "bottom",
}

export enum ProductTypes {
  CentralTelecomunicationShelf = 1,
  MainTelecomunicationShelf = 2,
  ODFOpticRack = 3,
  SwitchKombo = 4,
  SvetaforDetektor = 5,
  SvetaforDetektorForCamera = 6,
  TerminalServer = 7,
  Stabilizer = 8,
  Akumalator = 9,
  DistributionShelf = 10,
  Camera = 11,
  Projector = 12,
  SwitchPoe = 13,
  MiniOptikRack = 14,
  Avtomat = 15,
  ElectrCabel = 16,
  UtpCabel = 17,
  Stanchion = 18,
  Socket = 19,
  Ups = 20,
  SpeedCheckingRadar = 21,
  TelecomunicationShelf = 22,
  Corob = 23,
  WallBracket = 24,
  PillarBracket = 25,
  Connector = 26,
  Counter = 27,
  Freezer = 28,
  GlueForNail = 29,
  SipHook = 30,
  CabelHook = 31,
  Nail = 32,
  Ribbon = 33,
  Server = 34,
  GofraShell = 35,
  PlasticShell = 36,
  VideoRecorder = 37,
}

export interface SelectPickerOptionsProps {
  readonly label: string;
  readonly value: string | number;
}

export interface PaginationQuery {
  readonly pageNumber: number;
  readonly pageSize: number;
}

export interface Dict<T> {
  readonly [key: string]: T;
}

export type SvgProps = React.SVGProps<SVGSVGElement>;

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export enum SizeType {
  Small = "small",
  Large = "large",
  Medium = "medium",
}

export enum Direction {
  Vertical = "vertical",
  Horizontal = "horizontal",
}
