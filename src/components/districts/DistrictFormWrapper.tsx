import { useCallback, useEffect, useMemo, useState } from "react";
import { DistrictProps } from "../../api/districts/DistrictsDto";
import { useI18n } from "../../i18n/I18nContext";
import { useNavigate } from "react-router-dom";
import { useDistrictsApiContext } from "../../api/districts/DistrictsApiContext";
import { toast } from "react-toastify";
import { DistrictFilter } from "../../filters/DistrictFilter";
import Button, { BgColors } from "../ui/Button";
import { showError } from "../../utils/NotificationUtils";

import DistrictForm from "./DistrictForm";
import TabPage from "../tabs/TabPage";

interface Props {
  readonly filter: DistrictFilter;
}

export default function DistrictFormWrapper({ filter }: Props) {
  const navigate = useNavigate();

  const { translate } = useI18n();
  const { DistrictsApi } = useDistrictsApiContext();

  const [initialValues, setInitialValues] = useState<DistrictProps>({
    regionId: 0,
    name: "",
    info: "",
  });

  const regionId = useMemo(() => filter.getRegionId() || 0, [filter]);
  const districtId = useMemo(() => filter.getDistrictId() || 0, [filter]);

  useEffect(() => {
    if (districtId) {
      DistrictsApi.getOneDistrict({ id: Number(districtId) })
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [DistrictsApi, districtId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (districtId) {
        DistrictsApi.updateDistrict({ ...value, regionId, id: districtId })
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/regions/district-table?regionId=${regionId}`);
          })
          .catch(showError);
      } else {
        DistrictsApi.cretaeDistrict({ ...value, regionId })
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/regions/district-table?regionId=${regionId}`);
          })
          .catch(showError);
      }
    },
    [regionId, navigate, DistrictsApi, districtId],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Yellow}
            heigh="34px"
            onClick={() => navigate(`/dashboard/regions/district-table?regionId=${regionId}`)}
          >
            {translate("BACK_BUTTON_TITLE")}
          </Button>
        </div>
      }
    >
      <DistrictForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
