import { useMemo } from "react";
import { useI18n } from "../../i18n/I18nContext";
import DeleteIcon from "../icons/DeleteIcon";
import PencilIcon from "../icons/PencilIcon";
import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import { noop } from "lodash";

interface Props {
  readonly data: any;
  readonly loading: boolean;
  readonly dele: (value: any) => void;
  readonly edit: (value: any) => void;
}

export default function SpeedCheckingTable({ data, loading, dele, edit }: Props) {
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
        Header: translate("Modeli"),
        accessor: "model",
        width: 400,
      },
      {
        Header: translate("Soni"),
        accessor: "count",
        width: 400,
      },
      {
        Header: translate("Qo'shimcha ma'lumot"),
        accessor: "info",
        width: 600,
      },
      {
        Header: translate("..."),
        accessor: "actions",
        width: 200,
        Cell: (row: any) => {
          return (
            <div className="d-flex justify-content-center gap-2">
              <Button
                className="text-light p-2"
                bgColor={BgColors.Yellow}
                onClick={() => edit(row?.row?.original?.id)}
              >
                <PencilIcon />
              </Button>
              <Button
                className="text-light p-2"
                bgColor={BgColors.Red}
                onClick={() => dele(row?.row?.original?.id)}
              >
                <DeleteIcon />
              </Button>
            </div>
          );
        },
      },
    ],
    [],
  );

  return <Table loading={loading} columns={columns} data={data} selectRowCheckbox={noop} />;
}
