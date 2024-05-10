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
  Camera = 1,
  SpeedCheckingCamera = 2,
  ANPRCamera = 3,
  PTZCamera = 4,
  C327Camera = 5,
  CHQBACamera = 6,
  C733Camera = 7,
  VideoRecorder = 8,
  Server = 9,
  SwitchPoe = 10,
  SwitchKombo = 11,
  SvetaforDetektor = 12,
  SvetaforDetektorForCamera = 13,
  TerminalServer = 14,
  Stabilizer = 15,
  Projector = 16,
  Akumalator = 17,
  CentralTelecomunicationShelf = 18,
  MainTelecomunicationShelf = 19,
  DistributionShelf = 20,
  TelecomunicationShelf = 21,
  UPS = 22,
  Counter = 23,
  UtpCabel = 24,
  ElectrCabel = 25,
  Socket = 26,
  ODFOpticRack = 27,
  MiniOptikRack = 28,
  Avtomat = 29,
  Stanchion = 30,
  Bracket = 31,
  Connector = 32,
  GofraShell = 33,
  Corob = 34,
  MountingBox = 35,
  Freezer = 36,
  Ribbon = 37,
  SipHook = 38,
  Nail = 39,
  GlueForNail = 40,
  CabelHook = 41,
  PlasticShell = 42,
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
