import { useMemo } from "react";
import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { noop } from "lodash";
import moment from "moment";

interface Props {
  readonly data: any;
  readonly loading: boolean;
  readonly dele: (value: any) => void;
  readonly edit: (value: any) => void;
}

export default function SocketTable({ data, loading, dele, edit }: Props) {
  const { translate } = useI18n();
  const columns = useMemo(
    () => [
      {
        Header: translate("T/r"),
        accessor: "id",
        width: 100,
        Cell: (row: any) => {
          return <span>{Number(row?.row?.id) + 1}</span>;
        },
      },
      {
        Header: translate("Modeli"),
        accessor: "model",
        width: 300,
      },
      {
        Header: translate("Soni"),
        accessor: "count",
        width: 300,
      },
      {
        Header: translate("Qo'shimcha ma'lumot"),
        accessor: "info",
        width: 300,
      },
      {
        Header: translate("Yaratilgan vaqti"),
        accessor: "createdDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{row?.value && moment(row?.value).format("DD-MM-YYYY | HH:mm")}</div>;
        },
      },
      {
        Header: translate("Yangilangan vaqti"),
        accessor: "updatedDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{row?.value && moment(row?.value).format("DD-MM-YYYY | HH:mm")}</div>;
        },
      },
      {
        Header: translate("REGION_TABLE_CREATED_BY_COLUMN_TITLE"),
        accessor: "creator",
        width: 200,
      },
      {
        Header: translate("REGION_TABLE_UPDATED_BY_COLUMN_TITLE"),
        accessor: "updator",
        width: 200,
      },
      {
        Header: translate("..."),
        accessor: "actions",
        width: 200,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center gap-2">
              <Button
                className="text-light p-2"
                bgColor={BgColors.Yellow}
                onClick={() => edit(row?.row?.original?.id)}
              >
                <PencilIcon />
              </Button>
              <Button
                className="text-light p-2"
                bgColor={BgColors.Red}
                onClick={() => dele(row?.row?.original?.id)}
              >
                <DeleteIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  return <Table loading={loading} columns={columns} data={data} selectRowCheckbox={noop} />;
}
