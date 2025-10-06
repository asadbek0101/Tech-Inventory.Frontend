import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { showError } from "../../utils/NotificationUtils";
import Button, { BgColors } from "../ui/Button";

import ObjectView from "./ObjectView";

import useLocationHelpers from "../../hooks/userLocationHelpers";
import axios from "axios";
import ProductViews from "../products/ProductViews";
import TabPage from "../tabs/TabPage";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectViewWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState({
    region: "",
    district: "",
    project: "",
    numberOfOrder: "",
    objectClass: "",
    objectClassType: "",
    nameAndAddress: "",
    latitude: "",
    longitude: "",
    info: "",

    akumalator: [],
    avtomat: [],
    box: [],
    bracket: [],
    utpCabel: [],
    electrCabel: [],
    camera: [],
    anprCamera: [],
    speedCheckingCamera: [],
    ptzCamera: [],
    c327Camera: [],
    chqbaCamera: [],
    c733Camera: [],
    videoRecorder: [],
    server: [],
    switchPoe: [],
    switchKombo: [],
    svetaforDetektor: [],
    svetaforDetektorForCamera: [],
    terminalServer: [],
    stabilizer: [],
    projector: [],
    centralTelecomunicationShelf: [],
    mainTelecomunicationShelf: [],
    distributionShelf: [],
    telecomunicationShelf: [],
    ups: [],
    counter: [],
    socket: [],
    odfOpticRack: [],
    miniOptikRack: [],
    stanchion: [],
    connector: [],
    gofraShell: [],
    corob: [],
    mountingBox: [],
    freezer: [],
    ribbon: [],
    sipHook: [],
    nail: [],
    glueForNail: [],
    cabelHook: [],
    plasticShell: [],
  });

  const { ObyektApi } = useObyektApiContext();

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    if (objectId !== 0) {
      ObyektApi.getOneObyekt({ id: objectId })
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [ObyektApi, objectId]);

  const downloadFile = useCallback(
    (value: any) => {
      axios({
        url: `http://172.24.201.4:1000/api/Object/tech-inventory-bucket?token=${value?.fileName}`,
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link: any = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${value?.fileName}`);
        document.body.appendChild(link);
        link.click();

        link.parentNode.removeChild(link);
      });
    },
    [ObyektApi],
  );

  return (
    <TabPage
      footerClassName="d-none"
      contentClassName="pb-3"
      headerComponent={
        <Button
          className="px-3 py-2 text-light"
          bgColor={BgColors.Yellow}
          onClick={() =>
            locationHelpers.pushQuery({ tab: ObjectFilterTabs.ObjectTable, objectId: 0 })
          }
        >
          Back
        </Button>
      }
    >
      <ObjectView initialValues={initialValues} setPath={downloadFile} />
      <ProductViews initialValues={initialValues} setInitialValues={setInitialValues} />
    </TabPage>
  );
}
