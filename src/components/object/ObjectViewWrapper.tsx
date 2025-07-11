import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import Button, { BgColors } from "../ui/Button";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { showError } from "../../utils/NotificationUtils";
import { useNavigate } from "react-router-dom";
import { ShelfTypes } from "../../api/shelf/ShelfDto";
import { CabelTypes } from "../../api/cabels/CabelDto";
import { RackTypes } from "../../api/rackes/RackesDto";
import { SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import { SwitchTypes } from "../../api/switches/SwitchesDto";
import { ShellTypes } from "../../api/shells/ShellsDto";
import { HookTypes } from "../../api/hooks/HooksDto";

import CustomCard from "../ui/CustomCard";
import ObjectView from "./ObjectView";
import CameraTableWrapper from "../cameras/CameraTableWrapper";
import CabelTableWrapper from "../cabels/CabelTableWrapper";
import ProjectorTableWrapper from "../projectors/ProjectorTableWrapper";
import ShelvesTableWrapper from "../shelves/ShelvesTableWrapper";
import RackesTableWrapper from "../rackes/RackesTableWrapper";
import SwitchesTableWrapper from "../switches/SwitchesTableWrapper";
import AkumalatorsTableWrapper from "../akumalators/AkumalatorsTableWrapper";
import AvtomatsTableWrapper from "../avtomats/AvtomatsTableWrapper";
import StabilizersTableWrapper from "../stabilizers/StabilizersTableWrapper";
import SvetaforTableWrapper from "../svetafor/SvetaforTableWrapper";
import SocketTableWrapper from "../sockets/SocketTableWrapper";
import TerminalServerTableWrapper from "../terminal-servers/TerminalServersTableWrapper";
import StanchionsTableWrapper from "../stanchions/StanchionsTableWrapper";
import SpeedCheckingTableWrapper from "../speed-checking/SpeedCheckingTableWrapper";
import UpsTableWrapper from "../ups/UpsTableWrapper";
import BoxesTableWrapper from "../boxes/BoxesTableWrapper";
import BracketsTableWrapper from "../brackets/BracketsTableWrapper";
import ConnectorsTableWrapper from "../connectors/ConnectorsTableWrapper";
import CountersTableWrapper from "../counters/CountersTableWrapper";
import HooksTableWrapper from "../hooks/HooksTableWrapper";
import NailsTableWrapper from "../nails/NailsTableWrapper";
import RibbonsTableWrapper from "../ribbons/RibbonsTableWrapper";
import ServersTableWrapper from "../servers/ServersTableWrapper";
import ShellsTableWrapper from "../shells/ShellsTableWrapper";
import VideoRecordersTableWrapper from "../video-recorders/VideoRecorderTableWrapper";
import FreezersTableWrapper from "../freezers/FreezersTableWrapper";
import AddIcon from "../icons/AddIcon";
import { ProductTypes } from "../../api/AppDto";
import { CameraTypes } from "../../api/cameras/CameraDto";
import MountingBoxTableWrapper from "../mounting-box/MountingBoxTableWrapper";
import PencilIcon from "../icons/PencilIcon";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import axios from "axios";
import GluesTableWrapper from "../glues/GluesTableWrapper";

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
  });

  const [productsCounts, setProductsCounts] = useState({
    cameraCount: 0,
    speedCheckingCameraCount: 0,
    anprCameraCount: 0,
    ptzCameraCount: 0,
    c327CameraCount: 0,
    chqbaCameraCount: 0,
    c733CameraCount: 0,
    upsCount: 0,
    speedCheckingCount: 0,
    socketCount: 0,
    stanchionCount: 0,
    avtomatCount: 0,
    akumalatorCount: 0,
    projectorCount: 0,
    odfOpticRackCount: 0,
    miniOpticRackCount: 0,
    distributionShelfCount: 0,
    mainElectronicShelfCount: 0,
    telecommunicationShelfCount: 0,
    centralTelecommunicationShelfCount: 0,
    boksCount: 0,
    svetaforDetectorCount: 0,
    svetaforDetectorForCameraCount: 0,
    electrCabelCount: 0,
    utpCabelCount: 0,
    switchComboCount: 0,
    switchPoeCount: 0,
    stabilizerCount: 0,
    terminalServerCount: 0,
    boxCount: 0,
    bracketCount: 0,
    connectorCount: 0,
    counterCount: 0,
    sipHookCount: 0,
    cabelHookCount: 0,
    gofraShellCount: 0,
    plasticShellCount: 0,
    videoRecorderCount: 0,
    ribbonCount: 0,
    serverCount: 0,
    freezerCount: 0,
    nailCount: 0,
    glueForNailCount: 0,
    mountingBoxCount: 0,
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

  useEffect(() => {
    ObyektApi.getObyektProducts({ obyektId: objectId })
      .then((r) => setProductsCounts(r?.data))
      .catch(showError);
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
    <div className="py-2 px-4 w-100">
      <div className="my-3">
        <Button
          className="px-3 py-2 text-light"
          bgColor={BgColors.Yellow}
          onClick={() =>
            locationHelpers.pushQuery({ tab: ObjectFilterTabs.ObjectTable, objectId: 0 })
          }
        >
          Back
        </Button>
      </div>
      <CustomCard>
        <ObjectView initialValues={initialValues} setPath={downloadFile} />
      </CustomCard>
      <div className="mt-3 d-flex">
        <Button
          className="py-1 px-3 text-light"
          bgColor={BgColors.Green}
          heigh="34px"
          icon={<AddIcon />}
          onClick={() =>
            locationHelpers.pushQuery({
              tab: ObjectFilterTabs.ObjectProductsForm,
              objectId: objectId,
            })
          }
        >
          Jihozlar qo'shish
        </Button>
        <Button
          className="py-1 px-3 text-light ms-3"
          bgColor={BgColors.Yellow}
          heigh="34px"
          icon={<PencilIcon />}
          onClick={() =>
            locationHelpers.pushQuery({ tab: ObjectFilterTabs.ObjectForm, objectId: objectId })
          }
        >
          Obyektni o'zgaritirish
        </Button>
      </div>

      {productsCounts.cameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Kamera</h5>
          </div>
          <CameraTableWrapper
            filter={filter}
            cameraType={CameraTypes.Camera}
            productForForm={ProductTypes.Camera}
          />
        </CustomCard>
      )}

      {productsCounts.speedCheckingCameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Avtomabil tezligini aniqlovchi kamera(radar)</h5>
          </div>
          <CameraTableWrapper
            filter={filter}
            cameraType={CameraTypes.Radar}
            productForForm={ProductTypes.SpeedCheckingCamera}
          />
        </CustomCard>
      )}

      {productsCounts.anprCameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Davlat raqamini aniqlovchi kamera(ANPR)</h5>
          </div>
          <CameraTableWrapper
            filter={filter}
            cameraType={CameraTypes.ANPR}
            productForForm={ProductTypes.ANPRCamera}
          />
        </CustomCard>
      )}

      {productsCounts.ptzCameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Aynalma kamera(PTZ)</h5>
          </div>
          <CameraTableWrapper
            filter={filter}
            cameraType={CameraTypes.PTZ}
            productForForm={ProductTypes.PTZCamera}
          />
        </CustomCard>
      )}

      {productsCounts.c327CameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>To'xtash va to'xtab turish qoidabuzarligini aniqlovchi kamera(3.27)</h5>
          </div>
          <CameraTableWrapper
            filter={filter}
            cameraType={CameraTypes.C327}
            productForForm={ProductTypes.C327Camera}
          />
        </CustomCard>
      )}

      {productsCounts.chqbaCameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Chorrahadagi qoidabuzarligini aniqlovchi kamera</h5>
          </div>
          <CameraTableWrapper
            filter={filter}
            cameraType={CameraTypes.CHQBA}
            productForForm={ProductTypes.CHQBACamera}
          />
        </CustomCard>
      )}

      {productsCounts.c733CameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Yuz yoki avtotransport vositasi davlat raqamini aniqlovchi kamera(733)</h5>
          </div>
          <CameraTableWrapper
            filter={filter}
            cameraType={CameraTypes.C733}
            productForForm={ProductTypes.C733Camera}
          />
        </CustomCard>
      )}

      {productsCounts.videoRecorderCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Video registrator</h5>
          </div>
          <VideoRecordersTableWrapper filter={filter} productForForm={ProductTypes.VideoRecorder} />
        </CustomCard>
      )}

      {productsCounts.serverCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Server</h5>
          </div>
          <ServersTableWrapper filter={filter} productForForm={ProductTypes.Server} />
        </CustomCard>
      )}

      {productsCounts.switchPoeCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Switch Poe</h5>
          </div>
          <SwitchesTableWrapper
            filter={filter}
            switchType={SwitchTypes.SwitchPoE}
            productForForm={ProductTypes.SwitchPoe}
          />
        </CustomCard>
      )}

      {productsCounts.switchComboCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Switch kombo</h5>
          </div>
          <SwitchesTableWrapper
            filter={filter}
            switchType={SwitchTypes.SwitchCombo}
            productForForm={ProductTypes.SwitchKombo}
          />
        </CustomCard>
      )}

      {productsCounts.svetaforDetectorCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Svetafor detektor</h5>
          </div>
          <SvetaforTableWrapper
            filter={filter}
            svetaforType={SvetaforTypes.SvetaforDetector}
            productForForm={ProductTypes.SvetaforDetektorForCamera}
          />
        </CustomCard>
      )}

      {productsCounts.svetaforDetectorForCameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Svetafor detektor kamera uchun</h5>
          </div>
          <SvetaforTableWrapper
            filter={filter}
            svetaforType={SvetaforTypes.SvetaforDetectorForCamera}
            productForForm={ProductTypes.SvetaforDetektorForCamera}
          />
        </CustomCard>
      )}

      {productsCounts.terminalServerCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Terminal Server</h5>
          </div>
          <TerminalServerTableWrapper
            filter={filter}
            productForForm={ProductTypes.TerminalServer}
          />
        </CustomCard>
      )}

      {productsCounts.stabilizerCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Stabilizator</h5>
          </div>
          <StabilizersTableWrapper filter={filter} productForForm={ProductTypes.Stabilizer} />
        </CustomCard>
      )}

      {productsCounts.projectorCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Projektor</h5>
          </div>
          <ProjectorTableWrapper filter={filter} productForForm={ProductTypes.Projector} />
        </CustomCard>
      )}

      {productsCounts.akumalatorCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Akumalator</h5>
          </div>
          <AkumalatorsTableWrapper filter={filter} productForForm={ProductTypes.Akumalator} />
        </CustomCard>
      )}

      {productsCounts.centralTelecommunicationShelfCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Markaziy telekomunikatsion javon</h5>
          </div>
          <ShelvesTableWrapper
            filter={filter}
            shelfType={ShelfTypes.CentralTelecommunicationShelf}
            productForForm={ProductTypes.CentralTelecomunicationShelf}
          />
        </CustomCard>
      )}

      {productsCounts.mainElectronicShelfCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Asosiy elektron javon</h5>
          </div>
          <ShelvesTableWrapper
            filter={filter}
            shelfType={ShelfTypes.MainElectronicShelf}
            productForForm={ProductTypes.MainTelecomunicationShelf}
          />
        </CustomCard>
      )}

      {productsCounts.distributionShelfCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Tarqatish javon</h5>
          </div>
          <ShelvesTableWrapper
            filter={filter}
            shelfType={ShelfTypes.DistributionShelf}
            productForForm={ProductTypes.DistributionShelf}
          />
        </CustomCard>
      )}

      {productsCounts.telecommunicationShelfCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Telekomunikatsion javon</h5>
          </div>
          <ShelvesTableWrapper
            filter={filter}
            shelfType={ShelfTypes.TelecommunicationShelf}
            productForForm={ProductTypes.TelecomunicationShelf}
          />
        </CustomCard>
      )}

      {productsCounts.upsCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>UPS</h5>
          </div>
          <UpsTableWrapper filter={filter} productForForm={ProductTypes.UPS} />
        </CustomCard>
      )}

      {productsCounts.counterCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Elektr energiya hisoblagichi</h5>
          </div>
          <CountersTableWrapper filter={filter} productForForm={ProductTypes.Counter} />
        </CustomCard>
      )}

      {productsCounts.utpCabelCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>UTP kabel</h5>
          </div>
          <CabelTableWrapper
            filter={filter}
            cabelType={CabelTypes.UTPable}
            productForForm={ProductTypes.UtpCabel}
          />
        </CustomCard>
      )}

      {productsCounts.electrCabelCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Elektr kabel</h5>
          </div>
          <CabelTableWrapper
            filter={filter}
            cabelType={CabelTypes.ElectricCable}
            productForForm={ProductTypes.ElectrCabel}
          />
        </CustomCard>
      )}

      {productsCounts.socketCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Rozetka</h5>
          </div>
          <SocketTableWrapper filter={filter} productForForm={ProductTypes.Socket} />
        </CustomCard>
      )}

      {productsCounts.odfOpticRackCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>ODF optik boks</h5>
          </div>
          <RackesTableWrapper
            filter={filter}
            rackType={RackTypes.ODFOpticRack}
            productForForm={ProductTypes.ODFOpticRack}
          />
        </CustomCard>
      )}

      {productsCounts.miniOpticRackCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Mini optik boks</h5>
          </div>
          <RackesTableWrapper
            filter={filter}
            rackType={RackTypes.MiniOpticRack}
            productForForm={ProductTypes.MiniOptikRack}
          />
        </CustomCard>
      )}

      {productsCounts.avtomatCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Avtomat</h5>
          </div>
          <AvtomatsTableWrapper filter={filter} productForForm={ProductTypes.Avtomat} />
        </CustomCard>
      )}

      {productsCounts.stanchionCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Ustun</h5>
          </div>
          <StanchionsTableWrapper filter={filter} productForForm={ProductTypes.Stanchion} />
        </CustomCard>
      )}

      {productsCounts.bracketCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Kronshteyn</h5>
          </div>
          <BracketsTableWrapper filter={filter} productForForm={ProductTypes.Bracket} />
        </CustomCard>
      )}

      {productsCounts.connectorCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Konnektor</h5>
          </div>
          <ConnectorsTableWrapper filter={filter} productForForm={ProductTypes.Connector} />
        </CustomCard>
      )}

      {productsCounts.gofraShellCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Gofra qobiq</h5>
          </div>
          <ShellsTableWrapper
            filter={filter}
            shellType={ShellTypes.GofraShell}
            productForForm={ProductTypes.GofraShell}
          />
        </CustomCard>
      )}

      {productsCounts.boxCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Korob</h5>
          </div>
          <BoxesTableWrapper filter={filter} productForForm={ProductTypes.Corob} />
        </CustomCard>
      )}

      {productsCounts.mountingBoxCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Montaj qutisi</h5>
          </div>
          <MountingBoxTableWrapper filter={filter} productForForm={ProductTypes.MountingBox} />
        </CustomCard>
      )}

      {productsCounts.freezerCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Qotirgich</h5>
          </div>
          <FreezersTableWrapper filter={filter} productForForm={ProductTypes.Freezer} />
        </CustomCard>
      )}

      {productsCounts.ribbonCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>SIP Lenta</h5>
          </div>
          <RibbonsTableWrapper filter={filter} productForForm={ProductTypes.Ribbon} />
        </CustomCard>
      )}

      {productsCounts.sipHookCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>SIP Xomut</h5>
          </div>
          <HooksTableWrapper
            filter={filter}
            hookType={HookTypes.SipHook}
            productForForm={ProductTypes.SipHook}
          />
        </CustomCard>
      )}

      {productsCounts.nailCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Burama mix</h5>
          </div>
          <NailsTableWrapper filter={filter} productForForm={ProductTypes.Nail} />
        </CustomCard>
      )}

      {productsCounts.glueForNailCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Burama mix uchun yelim pona</h5>
          </div>
          <GluesTableWrapper filter={filter} productForForm={ProductTypes.GlueForNail} />
        </CustomCard>
      )}

      {productsCounts.cabelHookCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Kabel Xomut</h5>
          </div>
          <HooksTableWrapper
            filter={filter}
            hookType={HookTypes.CabelHook}
            productForForm={ProductTypes.CabelHook}
          />
        </CustomCard>
      )}

      {productsCounts.plasticShellCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Plastik qobiq</h5>
          </div>
          <ShellsTableWrapper
            filter={filter}
            shellType={ShellTypes.PlasticShell}
            productForForm={ProductTypes.PlasticShell}
          />
        </CustomCard>
      )}

      <div className="py-3" />
    </div>
  );
}
