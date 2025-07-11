import { useCallback, useMemo } from "react";
import {
  ObjectFilter,
  ObjectFilterTabs,
  ObjectProductsPageTypes,
} from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { CabelTypes } from "../../api/cabels/CabelDto";
import { RackTypes } from "../../api/rackes/RackesDto";
import { ShelfTypes } from "../../api/shelf/ShelfDto";
import { SwitchTypes } from "../../api/switches/SwitchesDto";
import { SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import { useI18n } from "../../i18n/I18nContext";
import { objectProductTypesOptions } from "../../constants/AppConstants";
import { Form, Formik } from "formik";
import { ProductTypes } from "../../api/AppDto";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";
import { HookTypes } from "../../api/hooks/HooksDto";
import { ShellTypes } from "../../api/shells/ShellsDto";

import TabPage from "../tabs/TabPage";
import UpsTableWrapper from "../ups/UpsTableWrapper";
import Button, { BgColors } from "../ui/Button";
import CameraTableWrapper from "../cameras/CameraTableWrapper";
import CabelTableWrapper from "../cabels/CabelTableWrapper";
import ProjectorTableWrapper from "../projectors/ProjectorTableWrapper";
import RackesTableWrapper from "../rackes/RackesTableWrapper";
import SwitchesTableWrapper from "../switches/SwitchesTableWrapper";
import AkumalatorsTableWrapper from "../akumalators/AkumalatorsTableWrapper";
import AvtomatsTableWrapper from "../avtomats/AvtomatsTableWrapper";
import StabilizersTableWrapper from "../stabilizers/StabilizersTableWrapper";
import SvetaforTableWrapper from "../svetafor/SvetaforTableWrapper";
import AddIcon from "../icons/AddIcon";
import ShelvesTableWrapper from "../shelves/ShelvesTableWrapper";
import TerminalServerTableWrapper from "../terminal-servers/TerminalServersTableWrapper";
import SocketTableWrapper from "../sockets/SocketTableWrapper";
import SpeedCheckingTableWrapper from "../speed-checking/SpeedCheckingTableWrapper";
import StanchionsTableWrapper from "../stanchions/StanchionsTableWrapper";
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
import { CameraTypes } from "../../api/cameras/CameraDto";
import MountingBoxTableWrapper from "../mounting-box/MountingBoxTableWrapper";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import GluesTableWrapper from "../glues/GluesTableWrapper";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectProductsTableWrapper({ filter }: Props) {
  const { translate } = useI18n();

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product: number = useMemo(() => Number(filter.getProduct()) || 1, [filter]);

  const getProductType = useCallback(
    (value: any) => {
      const product = objectProductTypesOptions.filter((pr: any) => pr.value === value)[0];

      return product || { label: "", value: 0 };
    },
    [objectProductTypesOptions],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex gap-2">
            <Button
              className="py-1 px-3 text-light me-2"
              bgColor={BgColors.Green}
              heigh="34px"
              icon={<AddIcon />}
              onClick={() =>
                locationHelpers.pushQuery({
                  tab: ObjectFilterTabs.ObjectProducts,
                  productPageType: ObjectProductsPageTypes.Form,
                  product: product,
                  objectId: objectId,
                })
              }
            >
              {translate("ADD_BUTTON_TITLE")}
            </Button>
            <Formik initialValues={{ type: getProductType(product) }} onSubmit={noop}>
              {() => (
                <Form>
                  <SelectPickerField
                    isSearchable
                    width={400}
                    name="type"
                    onChanges={(value) =>
                      locationHelpers.pushQuery({
                        tab: ObjectFilterTabs.ObjectProducts,
                        product: value.value,
                        objectId: objectId,
                      })
                    }
                    options={objectProductTypesOptions}
                  />
                </Form>
              )}
            </Formik>
          </div>
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Yellow}
            heigh="34px"
            onClick={() =>
              locationHelpers.pushQuery({
                tab: ObjectFilterTabs.ObjectTable,
                objectId: 0,
              })
            }
          >
            {translate("BACK_BUTTON_TITLE")}
          </Button>
        </div>
      }
    >
      {product === ProductTypes.Camera && (
        <CameraTableWrapper
          filter={filter}
          cameraType={CameraTypes.Camera}
          productForForm={ProductTypes.Camera}
        />
      )}
      {product === ProductTypes.SpeedCheckingCamera && (
        <CameraTableWrapper
          filter={filter}
          cameraType={CameraTypes.Radar}
          productForForm={ProductTypes.SpeedCheckingCamera}
        />
      )}
      {product === ProductTypes.ANPRCamera && (
        <CameraTableWrapper
          filter={filter}
          cameraType={CameraTypes.ANPR}
          productForForm={ProductTypes.ANPRCamera}
        />
      )}
      {product === ProductTypes.PTZCamera && (
        <CameraTableWrapper
          filter={filter}
          cameraType={CameraTypes.PTZ}
          productForForm={ProductTypes.PTZCamera}
        />
      )}
      {product === ProductTypes.C327Camera && (
        <CameraTableWrapper
          filter={filter}
          cameraType={CameraTypes.C327}
          productForForm={ProductTypes.C327Camera}
        />
      )}
      {product === ProductTypes.CHQBACamera && (
        <CameraTableWrapper
          filter={filter}
          cameraType={CameraTypes.CHQBA}
          productForForm={ProductTypes.CHQBACamera}
        />
      )}
      {product === ProductTypes.C733Camera && (
        <CameraTableWrapper
          filter={filter}
          cameraType={CameraTypes.C733}
          productForForm={ProductTypes.C733Camera}
        />
      )}
      {product === ProductTypes.ElectrCabel && (
        <CabelTableWrapper
          filter={filter}
          cabelType={CabelTypes.ElectricCable}
          productForForm={ProductTypes.ElectrCabel}
        />
      )}
      {product === ProductTypes.UtpCabel && (
        <CabelTableWrapper
          filter={filter}
          cabelType={CabelTypes.UTPable}
          productForForm={ProductTypes.UtpCabel}
        />
      )}
      {product === ProductTypes.Projector && (
        <ProjectorTableWrapper filter={filter} productForForm={ProductTypes.Projector} />
      )}
      {product === ProductTypes.DistributionShelf && (
        <ShelvesTableWrapper
          filter={filter}
          shelfType={ShelfTypes.DistributionShelf}
          productForForm={ProductTypes.DistributionShelf}
        />
      )}
      {product === ProductTypes.ODFOpticRack && (
        <RackesTableWrapper
          filter={filter}
          rackType={RackTypes.ODFOpticRack}
          productForForm={ProductTypes.ODFOpticRack}
        />
      )}
      {product === ProductTypes.MiniOptikRack && (
        <RackesTableWrapper
          filter={filter}
          rackType={RackTypes.MiniOpticRack}
          productForForm={ProductTypes.MiniOptikRack}
        />
      )}
      {product === ProductTypes.SwitchKombo && (
        <SwitchesTableWrapper
          filter={filter}
          switchType={SwitchTypes.SwitchCombo}
          productForForm={ProductTypes.SwitchKombo}
        />
      )}
      {product === ProductTypes.SwitchPoe && (
        <SwitchesTableWrapper
          filter={filter}
          switchType={SwitchTypes.SwitchPoE}
          productForForm={ProductTypes.SwitchPoe}
        />
      )}
      {product === ProductTypes.Akumalator && (
        <AkumalatorsTableWrapper filter={filter} productForForm={ProductTypes.Akumalator} />
      )}
      {product === ProductTypes.Avtomat && (
        <AvtomatsTableWrapper filter={filter} productForForm={ProductTypes.Avtomat} />
      )}
      {product === ProductTypes.Stabilizer && (
        <StabilizersTableWrapper filter={filter} productForForm={ProductTypes.Stabilizer} />
      )}
      {product === ProductTypes.SvetaforDetektorForCamera && (
        <SvetaforTableWrapper
          filter={filter}
          svetaforType={SvetaforTypes.SvetaforDetectorForCamera}
          productForForm={ProductTypes.SvetaforDetektorForCamera}
        />
      )}
      {product === ProductTypes.SvetaforDetektor && (
        <SvetaforTableWrapper
          filter={filter}
          svetaforType={SvetaforTypes.SvetaforDetector}
          productForForm={ProductTypes.SvetaforDetektor}
        />
      )}
      {product === ProductTypes.Socket && (
        <SocketTableWrapper filter={filter} productForForm={ProductTypes.Socket} />
      )}
      {product === ProductTypes.TerminalServer && (
        <TerminalServerTableWrapper filter={filter} productForForm={ProductTypes.TerminalServer} />
      )}
      {product === ProductTypes.UPS && (
        <UpsTableWrapper filter={filter} productForForm={ProductTypes.UPS} />
      )}
      {product === ProductTypes.Stanchion && (
        <StanchionsTableWrapper filter={filter} productForForm={ProductTypes.Stanchion} />
      )}
      {product === ProductTypes.Bracket && (
        <BracketsTableWrapper filter={filter} productForForm={ProductTypes.Bracket} />
      )}
      {product === ProductTypes.Corob && (
        <BoxesTableWrapper filter={filter} productForForm={ProductTypes.Corob} />
      )}
      {product === ProductTypes.MountingBox && (
        <MountingBoxTableWrapper filter={filter} productForForm={ProductTypes.MountingBox} />
      )}
      {product === ProductTypes.Connector && (
        <ConnectorsTableWrapper filter={filter} productForForm={ProductTypes.Connector} />
      )}
      {product === ProductTypes.Counter && (
        <CountersTableWrapper filter={filter} productForForm={ProductTypes.Counter} />
      )}
      {product === ProductTypes.Nail && (
        <NailsTableWrapper filter={filter} productForForm={ProductTypes.Nail} />
      )}
      {product === ProductTypes.Ribbon && (
        <RibbonsTableWrapper filter={filter} productForForm={ProductTypes.Ribbon} />
      )}
      {product === ProductTypes.Server && (
        <ServersTableWrapper filter={filter} productForForm={ProductTypes.Server} />
      )}
      {product === ProductTypes.VideoRecorder && (
        <VideoRecordersTableWrapper filter={filter} productForForm={ProductTypes.VideoRecorder} />
      )}
      {product === ProductTypes.Freezer && (
        <FreezersTableWrapper filter={filter} productForForm={ProductTypes.Freezer} />
      )}
      {product === ProductTypes.TelecomunicationShelf && (
        <ShelvesTableWrapper
          filter={filter}
          shelfType={ShelfTypes.TelecommunicationShelf}
          productForForm={ProductTypes.TelecomunicationShelf}
        />
      )}
      {product === ProductTypes.MainTelecomunicationShelf && (
        <ShelvesTableWrapper
          filter={filter}
          shelfType={ShelfTypes.MainElectronicShelf}
          productForForm={ProductTypes.MainTelecomunicationShelf}
        />
      )}
      {product === ProductTypes.SipHook && (
        <HooksTableWrapper
          filter={filter}
          hookType={HookTypes.SipHook}
          productForForm={ProductTypes.SipHook}
        />
      )}
      {product === ProductTypes.CabelHook && (
        <HooksTableWrapper
          filter={filter}
          hookType={HookTypes.CabelHook}
          productForForm={ProductTypes.CabelHook}
        />
      )}
      {product === ProductTypes.CentralTelecomunicationShelf && (
        <ShelvesTableWrapper
          filter={filter}
          shelfType={ShelfTypes.CentralTelecommunicationShelf}
          productForForm={ProductTypes.CentralTelecomunicationShelf}
        />
      )}
      {product === ProductTypes.GofraShell && (
        <ShellsTableWrapper
          filter={filter}
          shellType={ShellTypes.GofraShell}
          productForForm={ProductTypes.GofraShell}
        />
      )}
      {product === ProductTypes.PlasticShell && (
        <ShellsTableWrapper
          filter={filter}
          shellType={ShellTypes.PlasticShell}
          productForForm={ProductTypes.PlasticShell}
        />
      )}

      {product === ProductTypes.GlueForNail && (
        <GluesTableWrapper filter={filter} productForForm={ProductTypes.GlueForNail} />
      )}
    </TabPage>
  );
}
