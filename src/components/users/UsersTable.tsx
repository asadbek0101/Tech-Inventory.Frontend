import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";
import { useMemo } from "react";

import Table from "../table/Table";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly deleteUser: (value: any) => void;
  readonly editDocument: (value: any) => void;
  readonly editStatus: (row: any, value: any) => void;
}

export default function UsersTable({ data = [], loading, deleteUser, editDocument }: Props) {
  const { translate } = useI18n();
  const columns: any = useMemo(
    () => [
      {
        Header: translate("USERS_TABLE_USER_ID_COLUMN_TITLE"),
        accessor: "id",
        width: 100,
      },
      {
        Header: translate("USERS_TABLE_USER_NAME_COLUMN_TITLE"),
        accessor: "userName",
        width: 200,
      },
      {
        Header: translate("USERS_TABLE_USER_EMAIL_COLUMN_TITLE"),
        accessor: "email",
        width: 240,
      },
      {
        Header: translate("To'liq nomi"),
        accessor: "fullName",
        width: 400,
        Cell: (row: any) => {
          return (
            <span>
              {row?.row?.original?.firstName +
                " " +
                row?.row?.original?.lastName +
                " " +
                row?.row?.original?.middleName}
            </span>
          );
        },
      },
      {
        Header: translate("Lavozim"),
        accessor: "roleName",
        width: 200,
      },
      {
        Header: translate("Hudud"),
        accessor: "region",
        width: 200,
      },
      {
        Header: translate("Telefon"),
        accessor: "phoneNumber",
        width: 200,
      },
      {
        Header: "Actions",
        accessor: "actions",
        width: 200,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => editDocument(row?.row?.original?.id)}
                className="py-2 px-2 text-light"
                bgColor={BgColors.Yellow}
              >
                <PencilIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  return <Table loading={loading} columns={columns} data={data} selectRowCheckbox={deleteUser} />;
}
