import moment from "moment";
import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly editNumberOfOrder: (value: any) => void;
  readonly selectIds: (value: any) => void;
}

export default function NumberOfOrderTable({ data, loading, editNumberOfOrder, selectIds }: Props) {
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
      header: translate("Nomeri"),
      access: "number",
      width: 200,
    },
    {
      header: translate("Hudud"),
      access: "region",
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
        if (row.updatedDate)
          return <div>{moment(row.updatedDate).format("HH:mm | DD-MM-YYYY")}</div>;
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
      header: translate("..."),
      access: "updatedBy",
      width: 100,
      ceil: (row: any) => {
        return (
          <div className="w-100 text-center">
            <Button
              onClick={() => editNumberOfOrder(row.id)}
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
