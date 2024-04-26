import { useCallback, useMemo, useState } from "react";
import { ObjectFilter, ObjectProductsPageTypes } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { objectProductTypesOptions } from "../../constants/AppConstants";
import { Form, Formik } from "formik";
import { ProductTypes } from "../../api/AppDto";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";

import TabPage from "../tabs/TabPage";
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
import { CabelTypes } from "../../api/cabels/CabelDto";
import { RackTypes } from "../../api/rackes/RackesDto";
import { ShelfTypes } from "../../api/shelf/ShelfDto";
import { SwitchTypes } from "../../api/switches/SwitchesDto";
import { SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import UpsTableWrapper from "../ups/UpsTableWrapper";
import SpeedCheckingTableWrapper from "../speed-checking/SpeedCheckingTableWrapper";
import StanchionsTableWrapper from "../stanchions/StanchionsTableWrapper";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectProductsTableWrapper({ filter }: Props) {
  const { translate } = useI18n();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const navigate = useNavigate();
  const product: number = useMemo(() => Number(filter.getProduct()) || 0, [filter]);

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
                navigate(
                  `/dashboard/objects/object-products?productPageType=${ObjectProductsPageTypes.Form}&product=${product}&objectId=${objectId}`,
                )
              }
            >
              {translate("ADD_BUTTON_TITLE")}
            </Button>
            <Formik initialValues={{ type: getProductType(product) }} onSubmit={noop}>
              {() => (
                <Form>
                  <SelectPickerField
                    width={400}
                    name="type"
                    onChanges={(value) =>
                      navigate(
                        `/dashboard/objects/object-products?product=${value.value}&objectId=${objectId}`,
                      )
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
            onClick={() => navigate(`/dashboard/objects`)}
          >
            {translate("BACK_BUTTON_TITLE")}
          </Button>
        </div>
      }
    >
      {product === ProductTypes.Camera && <CameraTableWrapper filter={filter} />}
      {product === ProductTypes.ElectrCabel && (
        <CabelTableWrapper filter={filter} cabelType={CabelTypes.ElectricCable} />
      )}
      {product === ProductTypes.UtpCabel && (
        <CabelTableWrapper filter={filter} cabelType={CabelTypes.UTPable} />
      )}
      {product === ProductTypes.Projector && <ProjectorTableWrapper filter={filter} />}
      {product === ProductTypes.DistributionShelf && (
        <ShelvesTableWrapper filter={filter} shelfType={ShelfTypes.DistributionShelf} />
      )}
      {product === ProductTypes.ODFOpticRack && (
        <RackesTableWrapper filter={filter} rackType={RackTypes.ODFOpticRack} />
      )}
      {product === ProductTypes.MiniOptikRack && (
        <RackesTableWrapper filter={filter} rackType={RackTypes.MiniOpticRack} />
      )}
      {product === ProductTypes.SwitchKombo && (
        <SwitchesTableWrapper filter={filter} switchType={SwitchTypes.SwitchCombo} />
      )}
      {product === ProductTypes.SwitchPoe && (
        <SwitchesTableWrapper filter={filter} switchType={SwitchTypes.SwitchPoE} />
      )}
      {product === ProductTypes.Akumalator && <AkumalatorsTableWrapper filter={filter} />}
      {product === ProductTypes.Avtomat && <AvtomatsTableWrapper filter={filter} />}
      {/* {product === "Sockets" && <SocketTableWrapper filter={filter} />} */}
      {product === ProductTypes.Stabilizer && <StabilizersTableWrapper filter={filter} />}
      {product === ProductTypes.SvetaforDetektorForCamera && (
        <SvetaforTableWrapper
          filter={filter}
          svetaforType={SvetaforTypes.SvetaforDetectorForCamera}
        />
      )}
      {product === ProductTypes.SvetaforDetektor && (
        <SvetaforTableWrapper filter={filter} svetaforType={SvetaforTypes.SvetaforDetector} />
      )}
      {product === ProductTypes.Socket && <SocketTableWrapper filter={filter} />}
      {product === ProductTypes.TerminalServer && <TerminalServerTableWrapper filter={filter} />}
      {product === ProductTypes.Ups && <UpsTableWrapper filter={filter} />}
      {product === ProductTypes.Stanchion && <StanchionsTableWrapper filter={filter} />}
      {product === ProductTypes.SpeedCheckingRadar && <SpeedCheckingTableWrapper filter={filter} />}
      {product === ProductTypes.TelecomunicationShelf && (
        <ShelvesTableWrapper filter={filter} shelfType={ShelfTypes.TelecommunicationShelf} />
      )}
      {product === ProductTypes.MainTelecomunicationShelf && (
        <ShelvesTableWrapper filter={filter} shelfType={ShelfTypes.MainElectronicShelf} />
      )}
      {product === ProductTypes.CentralTelecomunicationShelf && (
        <ShelvesTableWrapper filter={filter} shelfType={ShelfTypes.CentralTelecommunicationShelf} />
      )}
    </TabPage>
  );
}
