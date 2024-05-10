import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { useEffect, useMemo, useState } from "react";
import { useOjbectClassApiContext } from "../../api/object-class/ObjectClassApiContext";
import { ObjectClassFilter } from "../../filters/ObjectClassFilter";
import { showError } from "../../utils/NotificationUtils";
import { GroupBox } from "../ui/GroupBox";
import { toast } from "react-toastify";

import AddIcon from "../icons/AddIcon";
import TabPage from "../tabs/TabPage";
import Button, { BgColors } from "../ui/Button";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import ObjectClassTable from "./ObjectClassTable";

interface Props {
  readonly filter: ObjectClassFilter;
}

export default function ObjectClassTableWrapper({ filter }: Props) {
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const { translate } = useI18n();
  const { ObjectClassApi } = useOjbectClassApiContext();

  const navigate = useNavigate();
  const objectClassTypeId = useMemo(() => filter.getObjectClassTypeId() || 0, [filter]);

  useEffect(() => {
    if (objectClassTypeId) {
      setLoading(true);
      ObjectClassApi.getObjectClasses({ ...filter.getPaginationQuery(), objectClassTypeId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [objectClassTypeId, ObjectClassApi, filter]);

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
              navigate(
                `/dashboard/object-classes/class-form?objectClassTypeId=${objectClassTypeId}`,
              )
            }
          >
            {translate("ADD_BUTTON_TITLE")}
          </Button>
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Yellow}
            heigh="34px"
            onClick={() => navigate(`/dashboard/object-classes/class-type-table`)}
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
      <ObjectClassTable
        data={data?.data}
        loading={loading}
        seletIds={setDeleteDocuments}
        editDistrict={(value) =>
          navigate(
            `/dashboard/object-classes/class-form?objectClassTypeId=${objectClassTypeId}&objectClassId=${value}`,
          )
        }
      />
      <Modal
        show={deleteModal}
        closeHandler={() => setDeleteModal(false)}
        className="d-flex justify-content-center align-items-center"
        contentClassName="rounded p-4"
        width="500px"
      >
        <GroupBox>
          <YesOrNoModal
            title="REGION_TABLE_DELETE_REGIONS_MODAL_QUESTION"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  objectClassIds: deleteDocuments,
                };
                ObjectClassApi.deleteObjectClasses(json)
                  .then((r) => {
                    toast.success(r?.data?.message);
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
