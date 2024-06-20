export enum ConnectionTypes {
  FTTX = 1,
  GPON = 2,
  GSM = 3,
}

export interface ObyektReportProps {
  readonly id: number;
  readonly projectName: string;
  readonly nameAndAddress: string;
  readonly region: string;
  readonly district: string;
  readonly objectClass: string;
  readonly objectClassType: string;
  readonly numberOfOrder: string;
  readonly connectionType: string;
  readonly latitude: string;
  readonly longitude: string;
  readonly cameras: ObyektReportCameraProps[];
  readonly raradCameras: ObyektReportCameraProps[];
  readonly ptzCameras: ObyektReportCameraProps[];
  readonly anprCameras: ObyektReportCameraProps[];
  readonly c327Cameras: ObyektReportCameraProps[];
  readonly c733Cameras: ObyektReportCameraProps[];
  readonly chqbaCameras: ObyektReportCameraProps[];
  readonly videoRecorders: ObyektReportVideoRecorderProps[];
  readonly servers: ObyektReportServerProps[];
  readonly switchPoes: ObyektReportSwitchProps[];
  readonly switchKomboes: ObyektReportSwitchProps[];
  readonly svetaforDetektors: ObyektReportSvetaforProps[];
  readonly svetaforDetektorsForCamera: ObyektReportSvetaforProps[];
  readonly terminalServers: ObyektReportTerminalServerProps[];
  readonly stabilizers: ObyektReportStabilizatorProps[];
  readonly projectors: ObyektReportProjectorProps[];
  readonly akumalators: ObyektReportAkumalatorProps[];
  readonly mainElectryShelfs: ObyektReportShelfProps[];
  readonly centralTelecomShelfs: ObyektReportShelfProps[];
  readonly telecomShelfs: ObyektReportShelfProps[];
  readonly distributionShelfs: ObyektReportShelfProps[];
  readonly upses: ObyektReportUpsProps[];
  readonly counters: ObyektReportCounterProps[];
  readonly utpCabels: ObyektReportCabelProps[];
  readonly elektrCabels: ObyektReportCabelProps[];
  readonly sockets: ObyektReportSocketProps[];
  readonly oDFOpticRacks: ObyektReportRackProps[];
  readonly miniOpticRacks: ObyektReportRackProps[];
  readonly avtomats: ObyektReportAvtomatProps[];
  readonly stanchions: ObyektReportStanchionProps[];
  readonly brackets: ObyektReportBracketProps[];
  readonly connectors: ObyektReportConnectorProps[];
  readonly gofraShells: ObyektReportShellProps[];
  readonly boxes: ObyektReportBoxProps[];
  readonly mountingBoxes: ObyektReportMountingBoxProps[];
  readonly freezers: ObyektReportFreezerProps[];
  readonly ribbons: ObyektReportRibbonProps[];
  readonly sipHooks: ObyektReportHookProps[];
  readonly nails: ObyektReportNailProps[];
  readonly cabelHooks: ObyektReportHookProps[];
  readonly plasticShells: ObyektReportShellProps[];
  readonly gpoNs: ObyektReportGPONProps[];
  readonly fttXs: ObyektReportFTTXProps[];
  readonly gsMs: ObyektReportGSMProps[];
  readonly attachments: ObyektReportAttachmentProps[];
}

interface ObyektReportCameraProps {
  readonly id: number;
  readonly serialNumber: string;
  readonly ip: string;
  readonly status: string;
}

interface ObyektReportVideoRecorderProps {
  readonly id: number;
  readonly model: string;
}

interface ObyektReportServerProps {
  readonly id: number;
  readonly ip: string;
}

interface ObyektReportSwitchProps {
  readonly id: number;
  readonly model: string;
  readonly count: string;
}

interface ObyektReportSvetaforProps {
  readonly id: number;
  readonly model: string;
  readonly countOfPorts: string;
}

interface ObyektReportTerminalServerProps {
  readonly id: number;
  readonly model: string;
}

interface ObyektReportStabilizatorProps {
  readonly id: number;
  readonly model: string;
  readonly power: string;
}

interface ObyektReportProjectorProps {
  readonly id: number;
  readonly model: string;
  readonly count: string;
}

interface ObyektReportAkumalatorProps {
  readonly id: number;
  readonly model: string;
  readonly count: string;
}

interface ObyektReportShelfProps {
  readonly id: number;
  readonly brand: string;
  readonly serialNumber: string;
  readonly number: string;
}

interface ObyektReportUpsProps {
  readonly id: number;
  readonly model: string;
  readonly power: string;
}

interface ObyektReportCounterProps {
  readonly id: number;
  readonly model: string;
}

interface ObyektReportCabelProps {
  readonly id: number;
  readonly model: string;
  readonly meter: string;
}

interface ObyektReportSocketProps {
  readonly id: number;
  readonly model: string;
  readonly count: string;
}

interface ObyektReportRackProps {
  readonly id: number;
  readonly numberOfFibers: string;
  readonly typeOfAdapter: string;
  readonly countOfPorts: string;
}

interface ObyektReportAvtomatProps {
  readonly id: number;
  readonly model: string;
  readonly count: string;
}

interface ObyektReportStanchionProps {
  readonly id: number;
  readonly type: string;
  readonly count: string;
}

interface ObyektReportBracketProps {
  readonly id: number;
  readonly model: string;
  readonly count: string;
}

interface ObyektReportConnectorProps {
  readonly id: number;
  readonly count: string;
}

interface ObyektReportShellProps {
  readonly id: number;
  readonly meter: string;
}

interface ObyektReportBoxProps {
  readonly id: number;
  readonly type: string;
  readonly meter: string;
}

interface ObyektReportMountingBoxProps {
  readonly id: number;
  readonly model: string;
  readonly count: string;
}

interface ObyektReportFreezerProps {
  readonly id: number;
  readonly count: string;
}

interface ObyektReportRibbonProps {
  readonly id: number;
  readonly meter: string;
}

interface ObyektReportHookProps {
  readonly id: number;
  readonly count: string;
}

interface ObyektReportNailProps {
  readonly id: number;
  readonly weigth: string;
}

interface ObyektReportGPONProps {
  readonly id: number;
  readonly model: string;
  readonly serialNumber: string;
  readonly numberOfPort: string;
}

interface ObyektReportFTTXProps {
  readonly id: number;
  readonly model: string;
  readonly numberOfPort: string;
}

interface ObyektReportGSMProps {
  readonly id: number;
  readonly phoneNumber: string;
}

interface ObyektReportAttachmentProps {
  readonly id: number;
  readonly phoneNumber: string;
}
