import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { ProjectFilter } from "../../filters/ProjectFilter";
import { useEffect, useMemo, useState } from "react";
import { useNumberOfOrdersApiContext } from "../../api/number-of-orders/NumberOfOrderApiContext";
import Button, { BgColors } from "../ui/Button";

import AddIcon from "../icons/AddIcon";
import TabPage from "../tabs/TabPage";
import NumberOfOrderTable from "./NumberOfOrderTable";
import { showError } from "../../utils/NotificationUtils";

interface Props {
  readonly filter: ProjectFilter;
}

export default function NumberOfOrdersTableWrapper({ filter }: Props) {
  const [numberOfOrders, setNumberOfOrders] = useState<any[]>([]);

  const navigate = useNavigate();
  const { translate } = useI18n();
  const { NumberOfOrdersApi } = useNumberOfOrdersApiContext();

  const projectId = useMemo(() => filter.getProjectId() || 0, [filter]);

  useEffect(() => {
    NumberOfOrdersApi.getNumberOfOrders({ projectId })
      .then((r) => setNumberOfOrders(r?.data?.data))
      .catch(showError);
  }, [projectId, NumberOfOrdersApi]);

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Green}
            heigh="34px"
            icon={<AddIcon />}
            onClick={() =>
              navigate(`/dashboard/projects/number-of-order-form?projectId=${projectId}`)
            }
          >
            {translate("ADD_BUTTON_TITLE")}
          </Button>
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Yellow}
            heigh="34px"
            onClick={() => navigate(`/dashboard/projects/project-table`)}
          >
            {translate("BACK_BUTTON_TITLE")}
          </Button>
        </div>
      }
    >
      <NumberOfOrderTable data={numberOfOrders} loading={false} />
    </TabPage>
  );
}
