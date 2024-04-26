import { useNavigate } from "react-router-dom";
import { ProjectFilter } from "../../filters/ProjectFilter";
import { useI18n } from "../../i18n/I18nContext";
import TabPage from "../tabs/TabPage";
import Button, { BgColors } from "../ui/Button";
import NumberOfOrderForm from "./NumberOfOrderForm";
import { useCallback, useMemo, useState } from "react";
import { useNumberOfOrdersApiContext } from "../../api/number-of-orders/NumberOfOrderApiContext";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";

interface Props {
  readonly filter: ProjectFilter;
}

export default function NumberOfOrderFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState({
    name: "",
    number: "",
  });

  const navigate = useNavigate();
  const { translate } = useI18n();
  const { NumberOfOrdersApi } = useNumberOfOrdersApiContext();

  const projectId = useMemo(() => filter.getProjectId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      NumberOfOrdersApi.cretaeNumberOfOrder({ ...value, projectId })
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/projects/number-of-order-table?projectId=${projectId}`);
        })
        .catch(showError);
    },
    [projectId, NumberOfOrdersApi, navigate],
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
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
