import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";
import { useMemo } from "react";

import moment from "moment";
import Table from "../table/Table";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly setProject: (value: any) => void;
  readonly editProject: (value: any) => void;
  readonly selectIds: (value: any) => void;
}

export default function ProjectsTable({
  data = [],
  loading,
  setProject,
  editProject,
  selectIds,
}: Props) {
  const { translate } = useI18n();
  const columns = useMemo(
    () => [
      {
        Header: translate("T/r"),
        accessor: "id",
        width: 100,
        ceil: (row: any) => {
          return <div>{Number(row?.row?.id) + 1}</div>;
        },
      },
      {
        Header: translate("PROJECT_TABLE_VIEW_NUMBER_OF_ORDER_COLUMN_TITLE"),
        accessor: "districts",
        width: 200,
        Cell: (row: any) => {
          return (
            <span
              className="fw-bold text-success"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setProject(row?.row?.original?.id)}
            >
              {translate("View")}
            </span>
          );
        },
      },
      {
        Header: translate("PROJECT_TABLE_PROJECT_NAME_COLUMN_TITLE"),
        accessor: "name",
        width: 300,
      },
      {
        Header: translate("PROJECT_TABLE_PROJECT_INFO_COLUMN_TITLE"),
        accessor: "info",
        width: 200,
      },
      {
        Header: translate("Yaratilgan vaqti"),
        accessor: "createdDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{moment(row?.row?.original?.createdDate).format("DD-MM-YYYY | HH:mm")}</div>;
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
        Header: translate("Tomonidan yaratilgan"),
        accessor: "creator",
        width: 200,
      },
      {
        Header: translate("Tomonidan yangilangan"),
        accessor: "updator",
        width: 200,
      },
      {
        Header: translate("PROJECT_TABLE_PROJECT_ACTIONS_COLUMN_TITLE"),
        accessor: "actions",
        width: 200,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => editProject(row?.row?.original?.id)}
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

  return <Table loading={loading} columns={columns} data={data} selectRowCheckbox={selectIds} />;
}

// PROJECT_TABLE_ID_COLUMN_TITLE: "Id",
// PROJECT_TABLE_CREATED_DATE_COLUMN_TITLE: "Yaratilgan sana",
// PROJECT_TABLE_UPDATED_DATE_COLUMN_TITLE: "Yangilangan sana",
// PROJECT_TABLE_CREATED_BY_COLUMN_TITLE: "Yaratgan",
// PROJECT_TABLE_UPDATED_BY_COLUMN_TITLE: "Yangilangan",
// PROJECT_TABLE_PROJECT_NAME_COLUMN_TITLE: "Loyiha nomi",
// PROJECT_TABLE_PROJECT_INFO_COLUMN_TITLE: "Loyiha haqida ma'lumot",
// PROJECT_TABLE_PROJECT_ACTIONS_COLUMN_TITLE: "Harakatlar",
