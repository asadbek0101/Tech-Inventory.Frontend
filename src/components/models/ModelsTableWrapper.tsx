import { useNavigate } from "react-router-dom";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { useEffect, useState } from "react";
import { showError } from "../../utils/NotificationUtils";
import { useI18n } from "../../i18n/I18nContext";
import { ModelFilter } from "../../filters/ModelFilter";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { SelectPickerField } from "../form/SelectPrickerField";
import { modelTypesOptions } from "../../constants/AppConstants";

import TabPage from "../tabs/TabPage";
import ModelsTable from "./ModelsTable";
import Button, { BgColors } from "../ui/Button";
import AddIcon from "../icons/AddIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";

interface Props {
  readonly filter: ModelFilter;
}

export default function ModelsTableWrapper({ filter }: Props) {
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState<any>({});
  const [searchValue, setSearchValue] = useState<string>("");
  const [type, setType] = useState(1);
  const [loading, setLoading] = useState(false);

  const { ModelsApi } = useModelsApiContext();
  const { translate } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    ModelsApi.getModels({ ...filter.getPaginationQuery(), searchValue, type })
      .then((r) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [ModelsApi, searchValue, filter, type]);

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Green}
            heigh="34px"
            icon={<AddIcon />}
            onClick={() => navigate(`/dashboard/models/form`)}
          >
            {translate("ADD_BUTTON_TITLE")}
          </Button>
          <Formik initialValues={{ searchValue: "", modelTye: type }} onSubmit={noop}>
            {() => (
              <Form className="d-flex">
                <SelectPickerField
                  name="modelType"
                  width={320}
                  options={modelTypesOptions}
                  onChanges={(event) => setType(event.value)}
                />
                <InputField
                  name="searchValue"
                  className="ms-2"
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
      <ModelsTable
        data={data?.data}
        setIds={setDeleteDocuments}
        loading={loading}
        editRegion={(value) => {
          navigate(`/dashboard/models/form?modelId=${value}`);
        }}
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
                  modelIds: deleteDocuments,
                };
                ModelsApi.deleteModels(json)
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
