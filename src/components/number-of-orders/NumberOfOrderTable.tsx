import { useMemo } from "react";
import { useI18n } from "../../i18n/I18nContext";

import moment from "moment";
import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly editNumberOfOrder: (value: any) => void;
  readonly selectIds: (value: any) => void;
}

export default function NumberOfOrderTable({
  data = [],
  loading,
  editNumberOfOrder,
  selectIds,
}: Props) {
  const { translate } = useI18n();
  const columns = useMemo(
    () => [
      {
        Header: translate("T/r"),
        accessor: "id",
        width: 100,
        ceil: (row: any) => {
          return <div>{Number(row?.row?.id) + 1}</div>;
        },
      },
      {
        Header: translate("Nomeri"),
        accessor: "number",
        width: 300,
      },
      {
        Header: translate("Hudud"),
        accessor: "region",
        width: 300,
      },
      {
        Header: translate("REGION_TABLE_CREATED_DATE_COLUMN_TITLE"),
        accessor: "createdDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{moment(row?.value).format("DD-MM-YYYY | HH:mm")}</div>;
        },
      },
      {
        Header: translate("REGION_TABLE_UPDATED_DATE_COLUMN_TITLE"),
        accessor: "updatedDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{row?.value && moment(row?.value).format("DD-MM-YYYY | HH:mm")}</div>;
        },
      },
      {
        Header: translate("REGION_TABLE_CREATED_BY_COLUMN_TITLE"),
        accessor: "creator",
        width: 200,
      },
      {
        Header: translate("REGION_TABLE_UPDATED_BY_COLUMN_TITLE"),
        accessor: "updator",
        width: 200,
      },
      {
        Header: translate("..."),
        accessor: "actions",
        width: 200,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => editNumberOfOrder(row?.row?.original?.id)}
                className="py-2 px-2 text-light"
                bgColor={BgColors.Yellow}
              >
                <PencilIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  return <Table loading={loading} columns={columns} data={data} selectRowCheckbox={selectIds} />;
}
