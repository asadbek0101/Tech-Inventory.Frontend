import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RegionsProps } from "../../api/regions/RegoinsDto";
import { useRegionApiContext } from "../../api/regions/RegionsApiContext";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { DistrictFilter } from "../../filters/DistrictFilter";

import Button, { BgColors } from "../ui/Button";
import TabPage from "../tabs/TabPage";
import RegionsForm from "./RegionsForm";

interface Props {
  readonly filter: DistrictFilter;
}

export default function RegionsFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<RegionsProps>({
    name: "",
    info: "",
  });

  const { translate } = useI18n();

  const { RegionsApi } = useRegionApiContext();

  const navigate = useNavigate();

  const regionId = useMemo(() => filter.getRegionId() || 0, [filter]);

  useEffect(() => {
    if (regionId) {
      RegionsApi.getOneRegion({ id: Number(regionId) })
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [RegionsApi, regionId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (regionId) {
        const json = {
          ...value,
          id: regionId,
        };
        RegionsApi.updateRegion(json)
          .then((r) => {
            toast.success(r.data.message);
            navigate(`/dashboard/regions/region-table`);
          })
          .catch(showError);
      } else {
        RegionsApi.cretaeRegion(value)
          .then((r) => {
            toast.success(r.data.message);
            navigate(`/dashboard/regions/region-table`);
          })
          .catch(showError);
      }
    },
    [navigate, RegionsApi, regionId],
  );

  return (
    <TabPage
      headerComponent={
        <Button
          className=" px-3 text-light"
          bgColor={BgColors.Yellow}
          heigh="34px"
          onClick={() => navigate(`/dashboard/regions/region-table`)}
        >
          {translate("BACK_BUTTON_TITLE")}
        </Button>
      }
    >
      <RegionsForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
