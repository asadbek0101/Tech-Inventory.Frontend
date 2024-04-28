import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import Button, { BgColors } from "../ui/Button";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { showError } from "../../utils/NotificationUtils";
import { useAttachmentsApiContext } from "../../api/attachments/AttachmentsApiContext";
import { useNavigate } from "react-router-dom";

import CustomCard from "../ui/CustomCard";
import ObjectView from "./ObjectView";
import CameraTableWrapper from "../cameras/CameraTableWrapper";
import CabelTableWrapper from "../cabels/CabelTableWrapper";
import { CabelTypes } from "../../api/cabels/CabelDto";
import ProjectorTableWrapper from "../projectors/ProjectorTableWrapper";
import ShelvesTableWrapper from "../shelves/ShelvesTableWrapper";
import { ShelfTypes } from "../../api/shelf/ShelfDto";
import { RackTypes } from "../../api/rackes/RackesDto";
import RackesTableWrapper from "../rackes/RackesTableWrapper";
import { SwitchTypes } from "../../api/switches/SwitchesDto";
import SwitchesTableWrapper from "../switches/SwitchesTableWrapper";
import AkumalatorsTableWrapper from "../akumalators/AkumalatorsTableWrapper";
import AvtomatsTableWrapper from "../avtomats/AvtomatsTableWrapper";
import StabilizersTableWrapper from "../stabilizers/StabilizersTableWrapper";
import SvetaforTableWrapper from "../svetafor/SvetaforTableWrapper";
import { SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import SocketTableWrapper from "../sockets/SocketTableWrapper";
import TerminalServerTableWrapper from "../terminal-servers/TerminalServersTableWrapper";
import StanchionsTableWrapper from "../stanchions/StanchionsTableWrapper";
import SpeedCheckingTableWrapper from "../speed-checking/SpeedCheckingTableWrapper";
import UpsTableWrapper from "../ups/UpsTableWrapper";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectViewWrapper({ filter }: Props) {
  const [attachments, setAttachments] = useState([]);
  const [initialValues, setInitialValues] = useState({
    region: "",
    district: "",
    project: "",
    numberOfOrder: "",
    objectClass: "",
    objectClassType: "",
    name: "",
    home: "",
    street: "",
    latitude: "",
    longitude: "",
    info: "",
  });

  const [productsCounts, setProductsCounts] = useState({
    cameraCount: 0,
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
    centralTelecommunicationShelfCount: 1,
    boksCount: 0,
    svetaforDetectorCount: 0,
    svetaforDetectorForCameraCount: 0,
    electrCabelCount: 0,
    utpCabelCount: 1,
    switchComboCount: 0,
    switchPoeCount: 0,
    stabilizerCount: 0,
    terminalServerCount: 0,
  });

  const { ObyektApi } = useObyektApiContext();
  const { AttachmentsApi } = useAttachmentsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ObyektApi.getOneObyekt({ id: objectId })
      .then((r) => setInitialValues(r?.data))
      .catch(showError);
    ObyektApi.getObyektProducts({ obyektId: objectId })
      .then((r) => setProductsCounts(r?.data))
      .catch(showError);
    AttachmentsApi.getAttachments({ obyektId: objectId })
      .then((r) => setAttachments(r?.data))
      .catch(showError);
  }, [ObyektApi, AttachmentsApi, objectId]);

  const downloadFile = useCallback(
    (value: any) => {
      const type = value?.path?.substring(value?.path?.indexOf(".") + 1);
      ObyektApi.getMultiFile(value?.path, value?.fileName, type).catch(showError);
    },
    [ObyektApi],
  );

  return (
    <div className="py-2 px-4 w-100">
      <div className="my-3">
        <Button
          className="px-3 py-2 text-light"
          bgColor={BgColors.Yellow}
          onClick={() => navigate("/dashboard/objects/object-table")}
        >
          Back
        </Button>
      </div>
      <CustomCard>
        <ObjectView
          initialValues={initialValues}
          attachments={attachments}
          setPath={downloadFile}
        />
      </CustomCard>

      {productsCounts.cameraCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Kamera</h5>
          </div>
          <CameraTableWrapper filter={filter} />
        </CustomCard>
      )}

      {productsCounts.electrCabelCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Elektr kabel</h5>
          </div>
          <CabelTableWrapper filter={filter} cabelType={CabelTypes.ElectricCable} />
        </CustomCard>
      )}

      {productsCounts.utpCabelCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>UTP kabel</h5>
          </div>
          <CabelTableWrapper filter={filter} cabelType={CabelTypes.UTPable} />
        </CustomCard>
      )}

      {productsCounts.projectorCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Projektor</h5>
          </div>
          <ProjectorTableWrapper filter={filter} />
        </CustomCard>
      )}

      {productsCounts.distributionShelfCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Tarqatuvchi javon</h5>
          </div>
          <ShelvesTableWrapper filter={filter} shelfType={ShelfTypes.DistributionShelf} />
        </CustomCard>
      )}

      {productsCounts.odfOpticRackCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>ODF optik boks</h5>
          </div>
          <RackesTableWrapper filter={filter} rackType={RackTypes.ODFOpticRack} />
        </CustomCard>
      )}

      {productsCounts.miniOpticRackCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Mini optik boks</h5>
          </div>
          <RackesTableWrapper filter={filter} rackType={RackTypes.MiniOpticRack} />
        </CustomCard>
      )}

      {productsCounts.switchComboCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Switch kombo</h5>
          </div>
          <SwitchesTableWrapper filter={filter} switchType={SwitchTypes.SwitchCombo} />
        </CustomCard>
      )}

      {productsCounts.switchPoeCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Switch Poe</h5>
          </div>
          <SwitchesTableWrapper filter={filter} switchType={SwitchTypes.SwitchPoE} />
        </CustomCard>
      )}

      {productsCounts.akumalatorCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Akumalator</h5>
          </div>
          <AkumalatorsTableWrapper filter={filter} />
        </CustomCard>
      )}

      {productsCounts.avtomatCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Avtomat</h5>
          </div>
          <AvtomatsTableWrapper filter={filter} />
        </CustomCard>
      )}

      {productsCounts.stabilizerCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Stabilizator</h5>
          </div>
          <StabilizersTableWrapper filter={filter} />
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
          />
        </CustomCard>
      )}

      {productsCounts.svetaforDetectorCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Svetafor detektor</h5>
          </div>
          <SvetaforTableWrapper filter={filter} svetaforType={SvetaforTypes.SvetaforDetector} />
        </CustomCard>
      )}

      {productsCounts.socketCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Rozetka</h5>
          </div>
          <SocketTableWrapper filter={filter} />
        </CustomCard>
      )}

      {productsCounts.terminalServerCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Terminal Server</h5>
          </div>
          <TerminalServerTableWrapper filter={filter} />
        </CustomCard>
      )}

      {productsCounts.telecommunicationShelfCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Telekomunikatsion javon</h5>
          </div>
          <ShelvesTableWrapper filter={filter} shelfType={ShelfTypes.TelecommunicationShelf} />
        </CustomCard>
      )}

      {productsCounts.mainElectronicShelfCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Asosiy elektron javon</h5>
          </div>
          <ShelvesTableWrapper filter={filter} shelfType={ShelfTypes.MainElectronicShelf} />
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
          />
        </CustomCard>
      )}

      {productsCounts.socketCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Ustun</h5>
          </div>
          <StanchionsTableWrapper filter={filter} />
        </CustomCard>
      )}

      {productsCounts.speedCheckingCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>Tezlikni o'lchovchi radar</h5>
          </div>
          <SpeedCheckingTableWrapper filter={filter} />
        </CustomCard>
      )}

      {productsCounts.upsCount > 0 && (
        <CustomCard className="mt-4 p-3">
          <div className="my-2">
            <h5>UPS</h5>
          </div>
          <UpsTableWrapper filter={filter} />
        </CustomCard>
      )}

      <div className="py-3" />
    </div>
  );
}
