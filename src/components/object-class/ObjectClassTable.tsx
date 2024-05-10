import { useI18n } from "../../i18n/I18nContext";
import { useMemo } from "react";

import moment from "moment";
import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly loading?: boolean;
  readonly seletIds: (value: any) => void;
  readonly editDistrict: (value: any) => void;
}

export default function ObjectClassTable({ data = [], loading, seletIds, editDistrict }: Props) {
  const { translate } = useI18n();
  const columns = useMemo(
    () => [
      {
        Header: translate("T/r"),
        accessor: "id",
        width: 100,
        Cell: (row: any) => {
          return <span>{Number(row?.row?.id) + 1}</span>;
        },
      },
      {
        Header: translate("Tasnif nomi"),
        accessor: "name",
        width: 300,
      },
      {
        Header: translate("Qo'shimcha ma'lumot"),
        accessor: "info",
        width: 300,
      },
      {
        Header: translate("Yartailgan vaqti"),
        accessor: "createdDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{row?.value && moment(row?.value).format("DD-MM-YYYY | HH:mm")}</div>;
        },
      },
      {
        Header: translate("Yangilangan vaqti"),
        accessor: "updatedDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{row?.value && moment(row?.value).format("DD-MM-YYYY | HH:mm")}</div>;
        },
      },
      {
        Header: translate("Tomonidan yaratilgan"),
        accessor: "creator",
        width: 200,
      },
      {
        Header: translate("Tomonidan yangilangan"),
        accessor: "updator",
        width: 200,
      },
      {
        Header: translate("DISTRICT_TABLE_DISTRICT_ACTIONS_COLUMN_TITLE"),
        accessor: "...",
        width: 200,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center">
              <Button
                onClick={() => editDistrict(row?.row?.original?.id)}
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

  return <Table loading={loading} columns={columns} data={data} selectRowCheckbox={seletIds} />;
}
