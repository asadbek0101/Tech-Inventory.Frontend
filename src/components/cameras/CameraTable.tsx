import { useI18n } from "../../i18n/I18nContext";
import moment from "moment";
import Table from "../table/Table";

interface Props {
  readonly data: any[];
}

// public int Id { get; set; }
// public string Name { get; set; }
// public string Model { get; set; }
// public string SerialNumber { get; set; }
// public string Ip { get; set; }
// public string Status { get; set; }
// public string? Info { get; set; }

export default function CameraTable({ data }: Props) {
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
