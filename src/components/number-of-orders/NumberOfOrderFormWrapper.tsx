import { useNavigate } from "react-router-dom";
import { ProjectFilter } from "../../filters/ProjectFilter";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNumberOfOrdersApiContext } from "../../api/number-of-orders/NumberOfOrderApiContext";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { InitialNumberOfOrderProps } from "../../api/number-of-orders/NumberOfOrderDto";
import { useRegionApiContext } from "../../api/regions/RegionsApiContext";

import TabPage from "../tabs/TabPage";
import Button, { BgColors } from "../ui/Button";
import NumberOfOrderForm from "./NumberOfOrderForm";

interface Props {
  readonly filter: ProjectFilter;
}

export default function NumberOfOrderFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<InitialNumberOfOrderProps>({
    projectId: 0,
    regionId: 0,
    number: "",
    info: "",
  });

  const [regions, setRegions] = useState([]);

  const navigate = useNavigate();

  const { translate } = useI18n();
  const { NumberOfOrdersApi } = useNumberOfOrdersApiContext();
  const { RegionsApi } = useRegionApiContext();

  const projectId = useMemo(() => filter.getProjectId() || 0, [filter]);
  const numberOfOrderId = useMemo(() => filter.getNubmerOfOrderId() || 0, [filter]);

  useEffect(() => {
    RegionsApi.getRegionsList()
      .then((r) => {
        const _regions = r?.data?.map((region: any) => {
          return {
            label: region.name,
            value: region.id,
          };
        });
        setRegions(_regions);
      })
      .catch(showError);
  }, [RegionsApi]);

  useEffect(() => {
    if (numberOfOrderId) {
      NumberOfOrdersApi.getOneNumberOfOrder({ id: numberOfOrderId }).then((r: any) => {
        const json = {
          ...r?.data,
          regionId: {
            label: r?.data?.region,
            value: r?.data?.regionId,
          },
        };
        setInitialValues(json);
      });
    }
  }, [NumberOfOrdersApi, numberOfOrderId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (numberOfOrderId) {
        const json = {
          ...value,
          id: numberOfOrderId,
          projectId,
          regionId: value.regionId.value,
        };
        NumberOfOrdersApi.updateNumberOfOrder(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/projects/number-of-order-table?projectId=${projectId}`);
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
          projectId,
          regionId: value.regionId.value,
        };
        NumberOfOrdersApi.createNumberOfOrder(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/projects/number-of-order-table?projectId=${projectId}`);
          })
          .catch(showError);
      }
    },
    [projectId, NumberOfOrdersApi, navigate, numberOfOrderId],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Yellow}
            heigh="34px"
            onClick={() =>
              navigate(`/dashboard/projects/number-of-order-table?projectId=${projectId}`)
            }
          >
            {translate("BACK_BUTTON_TITLE")}
          </Button>
        </div>
      }
    >
      <NumberOfOrderForm
        regions={regions}
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
