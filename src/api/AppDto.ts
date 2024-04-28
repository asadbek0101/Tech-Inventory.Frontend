export enum UserRoles {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Staff = "Staff",
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
