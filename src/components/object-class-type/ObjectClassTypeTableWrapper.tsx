import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { useOjbectClassTypeApiContext } from "../../api/object-class-type/ObjectClassTypeApiContext";
import { ObjectClassFilter } from "../../filters/ObjectClassFilter";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { showError } from "../../utils/NotificationUtils";
import { GroupBox } from "../ui/GroupBox";
import { noop } from "lodash";

import TabPage from "../tabs/TabPage";
import Button, { BgColors } from "../ui/Button";
import AddIcon from "../icons/AddIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import ObjectClassTypeTable from "./ObjectClassTypeTable";

interface Props {
  readonly filter: ObjectClassFilter;
}

export default function ObjectClassTypeTableWrapper({ filter }: Props) {
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { ObjectClassTypeApi } = useOjbectClassTypeApiContext();
  const { translate } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    ObjectClassTypeApi.getObjectClassTypes({ ...filter.getPaginationQuery(), searchValue })
      .then((r) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [ObjectClassTypeApi, searchValue, filter]);

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Green}
            heigh="34px"
            icon={<AddIcon />}
            onClick={() => navigate(`/dashboard/object-classes/class-type-form`)}
          >
            {translate("ADD_BUTTON_TITLE")}
          </Button>
          <Formik initialValues={{ searchValue: "" }} onSubmit={noop}>
            {() => (
              <Form>
                <InputField
                  name="searchValue"
                  width={320}
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Seach..."
                />
              </Form>
            )}
          </Formik>
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
      <ObjectClassTypeTable
        data={data?.data}
        setIds={setDeleteDocuments}
        loading={loading}
        setDistrict={(value) => {
          navigate(`/dashboard/object-classes/class-table?objectClassTypeId=${value}`);
        }}
        editRegion={(value) => {
          navigate(`/dashboard/object-classes/class-type-form?objectClassTypeId=${value}`);
        }}
      />
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <GroupBox>
          <YesOrNoModal
            title="REGION_TABLE_DELETE_REGIONS_MODAL_QUESTION"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  objectClassTypeIds: deleteDocuments,
                };
                ObjectClassTypeApi.deleteObjectClassTypes(json)
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
