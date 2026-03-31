import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { ProjectFilter } from "../../filters/ProjectFilter";
import { useEffect, useMemo, useState } from "react";
import { useNumberOfOrdersApiContext } from "../../api/number-of-orders/NumberOfOrderApiContext";
import Button, { BgColors } from "../ui/Button";
import { showError } from "../../utils/NotificationUtils";
import { GroupBox } from "../ui/GroupBox";

import AddIcon from "../icons/AddIcon";
import TabPage from "../tabs/TabPage";
import NumberOfOrderTable from "./NumberOfOrderTable";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";

interface Props {
  readonly filter: ProjectFilter;
}

export default function NumberOfOrdersTableWrapper({ filter }: Props) {
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const { translate } = useI18n();
  const { NumberOfOrdersApi } = useNumberOfOrdersApiContext();

  const projectId = useMemo(() => filter.getProjectId() || 0, [filter]);

  useEffect(() => {
    setLoading(true);
    NumberOfOrdersApi.getNumberOfOrders({ projectId })
      .then((r) => {
        setData(r?.data);
        setLoading(false);
      })
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
      footerComponent={
        <div className="d-flex justify-content-between align-items-center h-100">
          <Button
            disabled={!(deleteDocuments && deleteDocuments?.length > 0)}
            onClick={() => setDeleteModal(true)}
            className="py-2 px-2 text-light"
            bgColor={deleteDocuments && deleteDocuments?.length > 0 ? BgColors.Red : BgColors.White}
          >
            <DeleteIcon color={deleteDocuments && deleteDocuments?.length > 0 ? "#fff" : "#000"} />
          </Button>
          <Paginator
            filter={filter}
            totalPageCount={data?.totalPageCount}
            totalRowCount={data?.totalRowCount}
          />
        </div>
      }
    >
      <NumberOfOrderTable
        data={data?.data}
        loading={loading}
        selectIds={setDeleteDocuments}
        editNumberOfOrder={(value) =>
          navigate(
            `/dashboard/projects/number-of-order-form?projectId=${projectId}&numberOfOrderId=${value}`,
          )
        }
      />
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <GroupBox>
          <YesOrNoModal
            title="REGION_TABLE_DELETE_REGIONS_MODAL_QUESTION"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  numberOfOrderIds: deleteDocuments,
                };
                NumberOfOrdersApi.deleteNumberOfOrders(json)
                  .then(() => {
                    window.location.reload();
                  })
                  .catch(showError);
              }
              setDeleteModal(false);
            }}
          />
        </GroupBox>
      </Modal>
    </TabPage>
  );
}
