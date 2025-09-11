import { useEffect, useMemo, useState } from "react";
import { useUsersContext } from "../../api/users/UsersContext";
import { UserFilter } from "../../filters/UserFIlter";
import { PositionType, TabPageType } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { GroupBox } from "../ui/GroupBox";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";
import Button, { BgColors } from "../ui/Button";
import { showError } from "../../utils/NotificationUtils";
import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";

import TabPage from "../tabs/TabPage";
import UsersTable from "./UsersTable";
import AddIcon from "../icons/AddIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import Paginator from "../paginator/Paginator";

interface Props {
  readonly filter: UserFilter;
}

export default function UsersTableWrapper({ filter }: Props) {
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [document, setDocument] = useState<any>({});
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>();

  const { translate } = useI18n();
  const { UsersApi } = useUsersContext();

  const navigate = useNavigate();
  const status = useMemo(() => filter.getStatus(), [filter]);
  const userType = useMemo(() => filter.getUserType(), [filter]);

  useEffect(() => {
    setLoading(true);
    UsersApi.getAllUsers({ ...filter.getPaginationQuery(), searchValue: search.toUpperCase() })
      .then((r: any) => {
        setLoading(false);
        setData(r?.data);
      })
      .catch(showError);
  }, [UsersApi, filter, search]);

  const roles = [
    {
      label: translate("SELECT_PICKER_PLACEHOLDER_TITLE"),
      value: "",
    },
    {
      label: translate("ROLE_SELECT_PICKER_ADMIN_TITLE"),
      value: "0",
    },
    {
      label: translate("ROLE_SELECT_PICKER_TEACHER_TITLE"),
      value: "1",
    },
    {
      label: translate("ROLE_SELECT_PICKER_ASSISTANT_TITLE"),
      value: "2",
    },
    {
      label: translate("ROLE_SELECT_PICKER_STUDENT_TITLE"),
      value: "3",
    },
  ];

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Green}
            heigh="34px"
            icon={<AddIcon />}
            onClick={() => navigate(`/dashboard/users/${TabPageType.Form}`)}
          >
            {translate("ADD_BUTTON_TITLE")}
          </Button>
          <Formik
            initialValues={{
              userType: {
                label: roles.filter((s) => s.value === userType)[0].label,
                value: userType,
              },
            }}
            onSubmit={noop}
          >
            {() => (
              <Form className="d-flex">
                <SelectPickerField
                  width={200}
                  labelPosition={PositionType.Left}
                  onChanges={(event) => {
                    navigate(`/dashboard/users/table?status=${status}&userType=${event.value}`);
                  }}
                  options={roles}
                  name="userType"
                />
                <InputField
                  width={300}
                  name="searchValue"
                  placeholder="SEARCH_INPUT_PLACEHOLDER_TITLE"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="ms-3"
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
      <UsersTable
        loading={loading}
        data={data?.data}
        editStatus={(row, value) => {
          row.status = value;
          setDocument(row);
        }}
        editDocument={(value) => navigate(`/dashboard/users/${TabPageType.Form}?userId=${value}`)}
        deleteUser={setDeleteDocuments}
      />
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <GroupBox>
          <YesOrNoModal
            title="LESSONS_TABLE_DELETE_LESSONS_QUESTION_TITLE"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  ids: deleteDocuments,
                };
                UsersApi.deleteUsers(json).then(() => {
                  window.location.reload();
                });
              }
              setDeleteModal(false);
            }}
          />
        </GroupBox>
      </Modal>
    </TabPage>
  );
}
