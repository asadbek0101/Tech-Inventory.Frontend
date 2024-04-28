import { useI18n } from "../../i18n/I18nContext";
import moment from "moment";
import Table from "../table/Table";

interface Props {
  readonly data: any[];
}

export default function CameraTable({ data }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("Modeli"),
      access: "model",
      width: 200,
    },
    {
      header: translate("Serial nomeri"),
      access: "serialNumber",
      width: 200,
    },
    {
      header: translate("Ip"),
      access: "ip",
      width: 200,
    },
    {
      header: translate("Status"),
      access: "status",
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
