import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";

interface Props {
  readonly data: any;
}

export default function ShelvesTable({ data }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("REGION_TABLE_ID_COLUMN_TITLE"),
      access: "id",
      width: 100,
    },
    {
      header: translate("Seriyasi"),
      access: "serialNumber",
      width: 200,
    },
    {
      header: translate("Raqami"),
      access: "number",
      width: 200,
    },
    {
      header: translate("Qo'shimcha ma'lumot"),
      access: "info",
      width: 200,
    },
  ];

  return <Table loading={false} headers={headers} data={data} />;
}
