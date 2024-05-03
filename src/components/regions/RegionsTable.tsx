import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";
import moment from "moment";
import Table from "../table/Table";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly setDistrict: (value: any) => void;
  readonly editRegion: (value: any) => void;
  readonly setIds: (value: any) => void;
}

export default function RegionsTable({ data, loading, setDistrict, editRegion, setIds }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("T/r"),
      access: "index",
      width: 50,
      ceil: (_: any, index: number) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      header: translate("REGION_TABLE_REGION_DISTRICTS_COLUMN_TITLE"),
      access: "districts",
      width: 200,
      ceil: (row: any) => {
        return (
          <div
            className="fw-bold text-success"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setDistrict(row.id)}
          >
            {translate("REGION_TABLE_REGION_DISTRICTS_TITLE")}
          </div>
        );
      },
    },
    {
      header: translate("REGION_TABLE_REGION_NAME_COLUMN_TITLE"),
      access: "name",
      width: 200,
    },
    {
      header: translate("REGION_TABLE_REGION_INFO_COLUMN_TITLE"),
      access: "info",
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
        if (row.updatedDate) return <div>{moment(row.updatedDate).format("DD-MM-YYYY")}</div>;
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
    {
      header: translate("Actions"),
      access: "updatedBy",
      width: 100,
      ceil: (row: any) => {
        return (
          <div className="d-flex gap-2">
            <Button
              onClick={() => editRegion(row.id)}
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
      selectRowCheckbox={setIds}
      withCheckbox
    />
  );
}
