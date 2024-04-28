import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";

interface Props {
  readonly data: any;
}

export default function AkumlatorsTable({ data }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("Quvvati"),
      access: "power",
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
