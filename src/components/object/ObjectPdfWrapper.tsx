import { useEffect, useMemo, useState } from "react";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { ObyektReportProps } from "../../api/obyekt/ObyektDto";
import ObjectPdf from "./ObjectPdf";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectPdfWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<ObyektReportProps>({
    id: 0,
    projectName: "",
    nameAndAddress: "",
    region: "",
    district: "",
    objectClass: "",
    objectClassType: "",
    numberOfOrder: "",
    connectionType: "",
    latitude: "",
    longitude: "",
    cameras: [],
    raradCameras: [],
    ptzCameras: [],
    anprCameras: [],
    c327Cameras: [],
    c733Cameras: [],
    chqbaCameras: [],
    videoRecorders: [],
    servers: [],
    switchPoes: [],
    switchKomboes: [],
    svetaforDetektors: [],
    svetaforDetektorsForCamera: [],
    terminalServers: [],
    stabilizers: [],
    projectors: [],
    akumalators: [],
    mainElectryShelfs: [],
    centralTelecomShelfs: [],
    telecomShelfs: [],
    distributionShelfs: [],
    upses: [],
    counters: [],
    utpCabels: [],
    elektrCabels: [],
    sockets: [],
    oDFOpticRacks: [],
    miniOpticRacks: [],
    avtomats: [],
    stanchions: [],
    brackets: [],
    connectors: [],
    gofraShells: [],
    boxes: [],
    mountingBoxes: [],
    freezers: [],
    ribbons: [],
    sipHooks: [],
    nails: [],
    cabelHooks: [],
    plasticShells: [],
    gpoNs: [],
    fttXs: [],
    gsMs: [],
    attachments: [],
  });

  const { ObyektApi } = useObyektApiContext();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ObyektApi.getObyektReportForPdf({ id: objectId })
      .then((r) => setInitialValues(r))
      .catch(showError);
  }, [ObyektApi, objectId]);

  return <ObjectPdf data={initialValues} />;
}
