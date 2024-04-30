import moment from "moment";
import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
}

export default function NumberOfOrderTable({ data, loading }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("REGION_TABLE_ID_COLUMN_TITLE"),
      access: "id",
      width: 100,
    },
    {
      header: translate("Nomi"),
      access: "name",
      width: 200,
    },
    {
      header: translate("Nomeri"),
      access: "number",
      width: 200,
    },
    {
      header: translate("REGION_TABLE_CREATED_DATE_COLUMN_TITLE"),
      access: "createdDate",
      width: 200,
      ceil: (row: any) => {
        return <div>{moment(row.createdDate).format("HH:mm | DD-MM-YYYY")}</div>;
      },
    },
    {
      header: translate("REGION_TABLE_UPDATED_DATE_COLUMN_TITLE"),
      access: "updatedDate",
      width: 200,
      ceil: (row: any) => {
        if (row.updatedDate) return <div>{moment(row.updatedDate).format("HH:mm | DD-MM-YYYY")}</div>;
      },
    },
    {
      header: translate("REGION_TABLE_CREATED_BY_COLUMN_TITLE"),
      access: "createdBy",
      width: 200,
    },
    {
      header: translate("REGION_TABLE_UPDATED_BY_COLUMN_TITLE"),
      access: "updatedBy",
      width: 200,
    },
  ];

  return <Table loading={loading} headers={headers} data={data} withCheckbox />;
}
