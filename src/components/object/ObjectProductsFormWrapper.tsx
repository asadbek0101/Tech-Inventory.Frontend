import { useCallback, useMemo } from "react";
import {
  ObjectFilter,
  ObjectFilterTabs,
  ObjectProductsPageTypes,
} from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { CabelTypes } from "../../api/cabels/CabelDto";
import { ShelfTypes } from "../../api/shelf/ShelfDto";
import { RackTypes } from "../../api/rackes/RackesDto";
import { ShellTypes } from "../../api/shells/ShellsDto";
import { CameraTypes } from "../../api/cameras/CameraDto";
import { HookTypes } from "../../api/hooks/HooksDto";
import { SwitchTypes } from "../../api/switches/SwitchesDto";
import { SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import { ProductTypes } from "../../api/AppDto";
import { useI18n } from "../../i18n/I18nContext";
import { objectProductTypesOptions } from "../../constants/AppConstants";

import TabPage from "../tabs/TabPage";
import Button, { BgColors } from "../ui/Button";
import CameraFormWrapper from "../cameras/CameraFormWrapper";
import CabelFormWrapper from "../cabels/CabelFormWrapper";
import ProjectorFormWrapper from "../projectors/ProjectorFormWrapper";
import RackesFormWrapper from "../rackes/RackesFormWrapper";
import SwitchesFormWrapper from "../switches/SwitchesFormWrapper";
import ShelvesFormWrapper from "../shelves/ShelvesFormWrapper";
import TerminalServersFormWrapper from "../terminal-servers/TerminalServersFormWrapper";
import SvetaforFormWrapper from "../svetafor/SvetaforFormWrapper";
import AvtomatsFormWrapper from "../avtomats/AvtomatsFormWrapper";
import AkumalatorsFormWrapper from "../akumalators/AkumalatorsFormWrapper";
import SocketFormWrapper from "../sockets/SocketFormWrapper";
import StabilizersFormWrapper from "../stabilizers/StabilizersFormWrapper";
import UpsFormWrapper from "../ups/UpsFormWrapper";
import SpeedCheckingFormWrapper from "../speed-checking/SpeedCheckingFormWrapper";
import StanchionsFormWrapper from "../stanchions/StanchionsFormWrapper";
import BoxesFormWrapper from "../boxes/BoxesFormWrapper";
import BracketsFormWrapper from "../brackets/BracketsFormWrapper";
import ConnectorsFormWrapper from "../connectors/ConnectorsFormWrapper";
import CountersFormWrapper from "../counters/CountersFormWrapper";
import HooksFormWrapper from "../hooks/HooksFormWrapper";
import NailsFormWrapper from "../nails/NailsFormWrapper";
import RibbonsFormWrapper from "../ribbons/RibbonsFormWrapper";
import ServersFormWrapper from "../servers/ServersFormWrapper";
import ShellsFormWrapper from "../shells/ShellsFormWrapper";
import VideoRecordersFormWrapper from "../video-recorders/VideoRecorderFormWrapper";
import FreezersFormWrapper from "../freezers/FreezersFormWrapper";
import MountingBoxFormWrapper from "../mounting-box/MountingBoxFormWrapper";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import { Formik } from "formik";
import { InputField } from "../form/InputField";
import { noop } from "lodash";
import { SelectPickerField } from "../form/SelectPrickerField";
import GluesFormWrapper from "../glues/GluesFormWrapper";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectProductsFormWrapper({ filter }: Props) {
  const { translate } = useI18n();

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => Number(filter.getProduct()) || 0, [filter]);

  const getTitle = useCallback(
    (value: any) => {
      const prd = objectProductTypesOptions.filter((pr: any) => pr.value === value);
      if (prd.length > 0) {
        return prd[0].label;
      } else {
        return "";
      }
    },
    [objectProductTypesOptions],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between">
          <div>
            <Formik initialValues={{}} onSubmit={noop}>
              {() => (
                <SelectPickerField
                  name="name"
                  width={500}
                  options={objectProductTypesOptions}
                  onChanges={(value: any) => {
                    locationHelpers.pushQuery({
                      product: value.value,
                      objectId: objectId,
                    });
                  }}
                />
              )}
            </Formik>
          </div>
          <Button
            className=" px-3 text-light"
            bgColor={BgColors.Yellow}
            heigh="34px"
            onClick={() =>
              locationHelpers.pushQuery({
                tab: ObjectFilterTabs.ObjectProducts,
                productPageType: ObjectProductsPageTypes.Table,
                product: product,
                objectId: objectId,
              })
            }
          >
            {translate("BACK_BUTTON_TITLE")}
          </Button>
        </div>
      }
    >
      {product === ProductTypes.Camera && (
        <CameraFormWrapper filter={filter} cameraType={CameraTypes.Camera} />
      )}
      {product === ProductTypes.SpeedCheckingCamera && (
        <CameraFormWrapper filter={filter} cameraType={CameraTypes.Radar} />
      )}
      {product === ProductTypes.ANPRCamera && (
        <CameraFormWrapper filter={filter} cameraType={CameraTypes.ANPR} />
      )}
      {product === ProductTypes.PTZCamera && (
        <CameraFormWrapper filter={filter} cameraType={CameraTypes.PTZ} />
      )}
      {product === ProductTypes.C327Camera && (
        <CameraFormWrapper filter={filter} cameraType={CameraTypes.C327} />
      )}
      {product === ProductTypes.CHQBACamera && (
        <CameraFormWrapper filter={filter} cameraType={CameraTypes.CHQBA} />
      )}
      {product === ProductTypes.C733Camera && (
        <CameraFormWrapper filter={filter} cameraType={CameraTypes.C733} />
      )}
      {product === ProductTypes.UtpCabel && (
        <CabelFormWrapper filter={filter} cabelType={CabelTypes.UTPable} />
      )}
      {product === ProductTypes.ElectrCabel && (
        <CabelFormWrapper filter={filter} cabelType={CabelTypes.ElectricCable} />
      )}
      {product === ProductTypes.Projector && <ProjectorFormWrapper filter={filter} />}
      {product === ProductTypes.ODFOpticRack && (
        <RackesFormWrapper filter={filter} rackType={RackTypes.ODFOpticRack} />
      )}
      {product === ProductTypes.MiniOptikRack && (
        <RackesFormWrapper filter={filter} rackType={RackTypes.MiniOpticRack} />
      )}
      {product === ProductTypes.DistributionShelf && (
        <ShelvesFormWrapper filter={filter} shelfType={ShelfTypes.DistributionShelf} />
      )}
      {product === ProductTypes.SwitchKombo && (
        <SwitchesFormWrapper filter={filter} switchType={SwitchTypes.SwitchCombo} />
      )}
      {product === ProductTypes.SwitchPoe && (
        <SwitchesFormWrapper filter={filter} switchType={SwitchTypes.SwitchPoE} />
      )}
      {product === ProductTypes.CentralTelecomunicationShelf && (
        <ShelvesFormWrapper filter={filter} shelfType={ShelfTypes.CentralTelecommunicationShelf} />
      )}
      {product === ProductTypes.MainTelecomunicationShelf && (
        <ShelvesFormWrapper filter={filter} shelfType={ShelfTypes.MainElectronicShelf} />
      )}
      {product === ProductTypes.TerminalServer && <TerminalServersFormWrapper filter={filter} />}
      {product === ProductTypes.SvetaforDetektorForCamera && (
        <SvetaforFormWrapper
          filter={filter}
          svetaforType={SvetaforTypes.SvetaforDetectorForCamera}
        />
      )}
      {product === ProductTypes.SvetaforDetektor && (
        <SvetaforFormWrapper filter={filter} svetaforType={SvetaforTypes.SvetaforDetector} />
      )}
      {product === ProductTypes.Avtomat && <AvtomatsFormWrapper filter={filter} />}
      {product === ProductTypes.Akumalator && <AkumalatorsFormWrapper filter={filter} />}
      {product === ProductTypes.Socket && <SocketFormWrapper filter={filter} />}
      {product === ProductTypes.Stabilizer && <StabilizersFormWrapper filter={filter} />}
      {product === ProductTypes.UPS && <UpsFormWrapper filter={filter} />}
      {product === ProductTypes.Stanchion && <StanchionsFormWrapper filter={filter} />}
      {product === ProductTypes.Bracket && <BracketsFormWrapper filter={filter} />}
      {product === ProductTypes.Corob && <BoxesFormWrapper filter={filter} />}
      {product === ProductTypes.MountingBox && <MountingBoxFormWrapper filter={filter} />}
      {product === ProductTypes.Connector && <ConnectorsFormWrapper filter={filter} />}
      {product === ProductTypes.Nail && <NailsFormWrapper filter={filter} />}
      {product === ProductTypes.Counter && <CountersFormWrapper filter={filter} />}
      {product === ProductTypes.Ribbon && <RibbonsFormWrapper filter={filter} />}
      {product === ProductTypes.Server && <ServersFormWrapper filter={filter} />}
      {product === ProductTypes.VideoRecorder && <VideoRecordersFormWrapper filter={filter} />}
      {product === ProductTypes.Freezer && <FreezersFormWrapper filter={filter} />}
      {product === ProductTypes.TelecomunicationShelf && (
        <ShelvesFormWrapper filter={filter} shelfType={ShelfTypes.TelecommunicationShelf} />
      )}
      {product === ProductTypes.SipHook && (
        <HooksFormWrapper filter={filter} hookType={HookTypes.SipHook} />
      )}
      {product === ProductTypes.CabelHook && (
        <HooksFormWrapper filter={filter} hookType={HookTypes.CabelHook} />
      )}
      {product === ProductTypes.GofraShell && (
        <ShellsFormWrapper filter={filter} shellType={ShellTypes.GofraShell} />
      )}
      {product === ProductTypes.PlasticShell && (
        <ShellsFormWrapper filter={filter} shellType={ShellTypes.PlasticShell} />
      )}

      {product === ProductTypes.GlueForNail && <GluesFormWrapper filter={filter} />}
    </TabPage>
  );
}
