import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";

import Table from "../table/Table";
import PencilIcon from "../icons/PencilIcon";
import StatusPicker from "../ui/StatusPecker";

interface Props {
  readonly data: any;
  readonly loading: boolean;
  readonly deleteUser: (value: any) => void;
  readonly editDocument: (value: any) => void;
  readonly editStatus: (row: any, value: any) => void;
}

export default function UsersTable({ data, loading, deleteUser, editStatus, editDocument }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("USERS_TABLE_USER_ID_COLUMN_TITLE"),
      access: "id",
      width: 100,
    },
    {
      header: translate("USERS_TABLE_USER_NAME_COLUMN_TITLE"),
      access: "userName",
      width: 240,
    },
    {
      header: translate("USERS_TABLE_USER_EMAIL_COLUMN_TITLE"),
      access: "email",
      width: 240,
    },
    {
      header: translate("Phone Number"),
      access: "phoneNumber",
      width: 240,
    },
    {
      header: "...",
      access: "details",
      width: 200,
      searchHidden: true,
      ceil: (row: any) => {
        return (
          <div className="d-flex gap-2">
            <Button
              onClick={() => editDocument(row)}
              className="py-2 px-2 text-light"
              bgColor={BgColors.Yellow}
            >
              <PencilIcon />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Table
      loading={loading}
      headers={headers}
      data={data}
      selectRowCheckbox={deleteUser}
      withCheckbox
    />
  );
}
