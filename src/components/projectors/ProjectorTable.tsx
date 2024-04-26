import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";

interface Props {
  readonly data: any;
}

export default function ProjectorTable({ data }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("REGION_TABLE_ID_COLUMN_TITLE"),
      access: "id",
      width: 100,
    },
    {
      header: translate("Modeli"),
      access: "model",
      width: 200,
    },
    {
      header: translate("Soni"),
      access: "count",
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
