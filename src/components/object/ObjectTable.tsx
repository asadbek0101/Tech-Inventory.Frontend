import { useI18n } from "../../i18n/I18nContext";

import Table from "../table/Table";
import moment from "moment";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";
import DonwloadIcon from "../icons/DowloadIcon";
import LocationIcon from "../icons/LocationIcon";
import ProductsIcon from "../icons/ProductsIcon";
import EyeIcon from "../icons/EyeIcon";
import { useMemo } from "react";

interface Props {
  readonly data: any;
  readonly loading: boolean;
  readonly selectIds: (value: any) => void;
  readonly readOnMap: (value: any) => void;
  readonly editObyekt: (value: any) => void;
  readonly setOjectForView: (value: any) => void;
  readonly setOjectForProducts: (value: any) => void;
  readonly downloadPdf: (value: any, fileName: string) => void;
}

export default function ObjectTable({
  data = [],
  setOjectForView,
  setOjectForProducts,
  selectIds,
  readOnMap,
  loading,
  editObyekt,
  downloadPdf,
}: Props) {
  const { translate } = useI18n();

  const columns = useMemo(
    () => [
      {
        Header: translate("T/r"),
        accessor: "id",
        width: 50,
        Cell: (row: any) => {
          return <span>{Number(row?.row?.id) + 1}</span>;
        },
      },
      {
        Header: translate("Loyiha nomi"),
        accessor: "project",
        width: 200,
      },
      {
        Header: translate("Hududi"),
        accessor: "region",
        width: 200,
      },
      {
        Header: translate("Obyekt nomi va manzili"),
        accessor: "nameAndAddress",
        width: 200,
      },
      {
        Header: translate("Ulanish turi"),
        accessor: "connectionType",
        width: 140,
      },
      {
        Header: translate("Joylashuv"),
        accessor: "longitude",
        width: 200,
        Cell: (row: any) => {
          return <span>{row?.row?.original?.latitude + ", " + row?.row?.original?.longitude}</span>;
        },
      },
      {
        Header: translate("Yaratilgan vaqti"),
        accessor: "createdDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{moment(row?.row?.original?.createdDate).format("DD.MM.YYYY | HH:mm")}</div>;
        },
      },
      {
        Header: translate("Yangilangan vaqti"),
        accessor: "updatedDate",
        width: 200,
        Cell: (row: any) => {
          return <div>{moment(row?.row?.original?.updatedDate).format("DD.MM.YYYY | HH:mm")}</div>;
        },
      },
      {
        Header: translate("Tomonidan yaratilgan"),
        accessor: "creator",
        width: 200,
      },
      {
        Header: translate("Tomonidan yangilandi"),
        accessor: "updator",
        width: 200,
      },
      {
        Header: translate("Actions"),
        accessor: "actions",
        width: 220,
        Cell: (row: any) => {
          return (
            <div className="d-flex gap-2">
              <Button
                onClick={() => setOjectForView(row?.row?.original?.id)}
                className="py-2 px-2 text-light"
                bgColor={BgColors.Green}
                hoverLabel="Jihozlarni ko'rish"
              >
                <EyeIcon />
              </Button>
              <Button
                onClick={() => setOjectForProducts(row?.row?.original?.id)}
                className="py-2 px-2 text-light"
                bgColor={BgColors.Green}
                hoverLabel="Jihozlarni qo'shish"
              >
                <ProductsIcon />
              </Button>
              <Button
                onClick={() => editObyekt(row?.row?.original?.id)}
                className="py-2 px-2 text-light"
                bgColor={BgColors.Yellow}
                hoverLabel="Obyektni yangilash"
              >
                <PencilIcon />
              </Button>
              <Button
                onClick={() => downloadPdf(row?.row?.original?.id, row?.row?.original?.name)}
                className="py-2 px-2 text-light"
                bgColor={BgColors.Navy}
                hoverLabel="PDFda yuklash"
              >
                <DonwloadIcon />
              </Button>
              <Button
                onClick={() => readOnMap(row?.row?.original?.id)}
                className="py-2 px-2 text-light"
                bgColor={BgColors.Navy}
                hoverLabel="Xaritada ko'rish"
              >
                <LocationIcon />
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
