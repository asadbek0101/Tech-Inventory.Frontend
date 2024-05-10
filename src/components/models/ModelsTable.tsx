import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";
import moment from "moment";
import { useMemo } from "react";
import { modelTypesOptions } from "../../constants/AppConstants";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly editRegion: (value: any) => void;
  readonly setIds: (value: any) => void;
}

export default function ModelsTable({ data = [], loading, editRegion, setIds }: Props) {
  const { translate } = useI18n();
  const columns: any = useMemo(
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
        Header: translate("Model nomi"),
        accessor: "name",
        width: 200,
      },
      {
        Header: translate("Qaysi jihoz uchun"),
        accessor: "type",
        width: 200,
        Cell: (row: any) => {
          return (
            <div>
              {modelTypesOptions.filter((f: any) => f.value === Number(row.value))[0]?.label}
            </div>
          );
        },
      },
      {
        Header: translate("Qo'shimcha ma'lumot"),
        accessor: "info",
        width: 200,
      },
      {
        Header: translate("Yaratilgan vaqti"),
        accessor: "createdDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{moment(row?.value).format("DD-MM-YYYY | HH:mm")}</div>;
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
        Header: translate("Tomonidan yaratildi"),
        accessor: "creator",
        width: 200,
      },
      {
        Header: translate("Tomonidan yangilandi"),
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
                onClick={() => editRegion(row?.row?.original?.id)}
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
  return <Table loading={loading} columns={columns} data={data} selectRowCheckbox={setIds} />;
}
