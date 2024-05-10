import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";
import moment from "moment";
import Table from "../table/Table";
import PencilIcon from "../icons/PencilIcon";
import { useMemo } from "react";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly setDistrict: (value: any) => void;
  readonly editRegion: (value: any) => void;
  readonly setIds: (value: any) => void;
}

export default function ObjectClassTypeTable({
  data = [],
  loading,
  setDistrict,
  editRegion,
  setIds,
}: Props) {
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
        Header: translate("Tasniflar"),
        accessor: "classes",
        width: 200,
        Cell: (row: any) => {
          return (
            <div
              className="fw-bold text-success"
              style={{
                cursor: "pointer",
              }}
              onClick={() => setDistrict(row?.row?.original?.id)}
            >
              {translate("Tasniflar")}
            </div>
          );
        },
      },
      {
        Header: translate("Tasnif turi nomi"),
        accessor: "name",
        width: 200,
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
