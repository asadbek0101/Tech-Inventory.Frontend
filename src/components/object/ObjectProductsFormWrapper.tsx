import { useCallback, useMemo, useState } from "react";
import { ObjectFilter, ObjectProductsPageTypes } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { CabelTypes } from "../../api/cabels/CabelDto";
import { ShelfTypes } from "../../api/shelf/ShelfDto";
import { RackTypes } from "../../api/rackes/RackesDto";
import { SwitchTypes } from "../../api/switches/SwitchesDto";
import { SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import { ProductTypes } from "../../api/AppDto";
import { useI18n } from "../../i18n/I18nContext";

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
import { objectProductTypesOptions } from "../../constants/AppConstants";
import UpsFormWrapper from "../ups/UpsFormWrapper";
import SpeedCheckingFormWrapper from "../speed-checking/SpeedCheckingFormWrapper";
import StanchionsFormWrapper from "../stanchions/StanchionsFormWrapper";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectProductsFormWrapper({ filter }: Props) {
  const navigate = useNavigate();
  const { translate } = useI18n();

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
            <h5>{getTitle(product)}</h5>
          </div>
          <Button
            className=" px-3 text-light"
            bgColor={BgColors.Yellow}
            heigh="34px"
            onClick={() =>
              navigate(
                `/dashboard/objects/object-products?productPageType=${ObjectProductsPageTypes.Table}&product=${product}&objectId=${objectId}`,
              )
            }
          >
            {translate("BACK_BUTTON_TITLE")}
          </Button>
        </div>
      }
    >
      {product === ProductTypes.Camera && <CameraFormWrapper filter={filter} />}
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
      {product === ProductTypes.Ups && <UpsFormWrapper filter={filter} />}
      {product === ProductTypes.Stanchion && <StanchionsFormWrapper filter={filter} />}
      {product === ProductTypes.SpeedCheckingRadar && <SpeedCheckingFormWrapper filter={filter} />}
      {product === ProductTypes.TelecomunicationShelf && (
        <ShelvesFormWrapper filter={filter} shelfType={ShelfTypes.TelecommunicationShelf} />
      )}
    </TabPage>
  );
}
