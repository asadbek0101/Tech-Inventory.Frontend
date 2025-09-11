import { useEffect, useState } from "react";
import { useProjectApiContext } from "../../api/projects/ProjectsApiContext";
import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { useI18n } from "../../i18n/I18nContext";
import { useNavigate } from "react-router-dom";
import { noop } from "lodash";
import { showError } from "../../utils/NotificationUtils";
import { ProjectFilter } from "../../filters/ProjectFilter";
import { GroupBox } from "../ui/GroupBox";

import TabPage from "../tabs/TabPage";
import ProjectsTable from "./ProjectsTable";
import Button, { BgColors } from "../ui/Button";
import AddIcon from "../icons/AddIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";

interface Props {
  readonly filter: ProjectFilter;
}

export default function ProjectsTableWrapper({ filter }: Props) {
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const { ProjectsApi } = useProjectApiContext();
  const { translate } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    ProjectsApi.getProjects({ ...filter.getPaginationQuery(), searchValue })
      .then((r) => {
        setLoading(false);
        setData(r?.data);
      })
      .catch(showError);
  }, [ProjectsApi, filter, searchValue]);

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Green}
            heigh="34px"
            icon={<AddIcon />}
            onClick={() => navigate(`/dashboard/projects/project-form`)}
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
      <ProjectsTable
        data={data?.data}
        setProject={(value) =>
          navigate(`/dashboard/projects/number-of-order-table?projectId=${value}`)
        }
        editProject={(value) => navigate(`/dashboard/projects/project-form?projectId=${value}`)}
        selectIds={setDeleteDocuments}
        loading={loading}
      />
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <GroupBox>
          <YesOrNoModal
            title="REGION_TABLE_DELETE_REGIONS_MODAL_QUESTION"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  projectIds: deleteDocuments,
                };
                ProjectsApi.deleteProjects(json)
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
