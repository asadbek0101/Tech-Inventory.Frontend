import moment from "moment";
import Table from "../table/Table";
import { useI18n } from "../../i18n/I18nContext";

interface Props {
  readonly data: any[];
}

export default function CabelTable({ data }: Props) {
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
      header: translate("Uzunligi"),
      access: "meter",
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
