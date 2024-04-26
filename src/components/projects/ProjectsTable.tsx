import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";

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
  data,
  loading,
  setProject,
  editProject,
  selectIds,
}: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("PROJECT_TABLE_ID_COLUMN_TITLE"),
      access: "id",
      width: 100,
    },
    {
      header: translate("PROJECT_TABLE_VIEW_NUMBER_OF_ORDER_COLUMN_TITLE"),
      access: "districts",
      width: 200,
      ceil: (row: any) => {
        return (
          <span
            className="fw-bold text-success"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setProject(row.id)}
          >
            {translate("View")}
          </span>
        );
      },
    },
    {
      header: translate("PROJECT_TABLE_PROJECT_NAME_COLUMN_TITLE"),
      access: "name",
      width: 200,
    },
    {
      header: translate("PROJECT_TABLE_PROJECT_INFO_COLUMN_TITLE"),
      access: "info",
      width: 200,
    },
    {
      header: translate("PROJECT_TABLE_CREATED_DATE_COLUMN_TITLE"),
      access: "createdDate",
      width: 140,
      ceil: (row: any) => {
        return <div>{moment(row.createdDate).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      header: translate("PROJECT_TABLE_UPDATED_DATE_COLUMN_TITLE"),
      access: "updatedDate",
      width: 140,
      ceil: (row: any) => {
        if (row.updatedDate) return <div>{moment(row.updatedDate).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      header: translate("PROJECT_TABLE_CREATED_BY_COLUMN_TITLE"),
      access: "createdBy",
      width: 140,
    },
    {
      header: translate("PROJECT_TABLE_UPDATED_BY_COLUMN_TITLE"),
      access: "updatedBy",
      width: 140,
    },
    {
      header: translate("PROJECT_TABLE_PROJECT_ACTIONS_COLUMN_TITLE"),
      access: "actions",
      width: 100,
      ceil: (row: any) => {
        return (
          <div className="d-flex gap-2">
            <Button
              onClick={() => editProject(row.id)}
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
      withCheckbox
      selectRowCheckbox={selectIds}
    />
  );
}

// PROJECT_TABLE_ID_COLUMN_TITLE: "Id",
// PROJECT_TABLE_CREATED_DATE_COLUMN_TITLE: "Yaratilgan sana",
// PROJECT_TABLE_UPDATED_DATE_COLUMN_TITLE: "Yangilangan sana",
// PROJECT_TABLE_CREATED_BY_COLUMN_TITLE: "Yaratgan",
// PROJECT_TABLE_UPDATED_BY_COLUMN_TITLE: "Yangilangan",
// PROJECT_TABLE_PROJECT_NAME_COLUMN_TITLE: "Loyiha nomi",
// PROJECT_TABLE_PROJECT_INFO_COLUMN_TITLE: "Loyiha haqida ma'lumot",
// PROJECT_TABLE_PROJECT_ACTIONS_COLUMN_TITLE: "Harakatlar",
