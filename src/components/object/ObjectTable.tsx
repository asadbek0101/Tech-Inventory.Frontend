import { useI18n } from "../../i18n/I18nContext";

import Table from "../table/Table";
import moment from "moment";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";
import DonwloadIcon from "../icons/DowloadIcon";
import LocationIcon from "../icons/LocationIcon";
import ProductsIcon from "../icons/ProductsIcon";
import EyeIcon from "../icons/EyeIcon";

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
  data,
  setOjectForView,
  setOjectForProducts,
  selectIds,
  readOnMap,
  loading,
  editObyekt,
  downloadPdf,
}: Props) {
  const { translate } = useI18n();

  const headers: any = [
    {
      header: translate("T/r"),
      access: "index",
      width: 50,
      ceil: (_: any, index: number) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      header: translate("Loyiha nomi"),
      access: "project",
      width: 200,
    },
    {
      header: translate("Hududi"),
      access: "region",
      width: 200,
    },
    {
      header: translate("Obyekt nomi va manzili"),
      access: "nameAndAddress",
      width: 200,
    },
    {
      header: translate("Ulanish turi"),
      access: "connectionType",
      width: 200,
    },
    {
      header: translate("Joylashuv"),
      access: "longitude",
      width: 200,
      ceil: (row: any) => {
        return <span>{row.latitude + ", " + row.longitude}</span>;
      },
    },
    {
      header: translate("Yaratilgan vaqti"),
      access: "createdDate",
      width: 200,
      ceil: (row: any) => {
        return <div>{moment(row.createdDate).format("HH:mm | DD.MM.YYYY ")}</div>;
      },
    },
    {
      header: translate("Tomonidan yaratilgan"),
      access: "owner",
      width: 200,
    },
    {
      header: translate("Actions"),
      access: "actions",
      width: 220,
      ceil: (row: any) => {
        return (
          <div className="d-flex gap-2">
            <Button
              onClick={() => setOjectForView(row.id)}
              className="py-2 px-2 text-light"
              bgColor={BgColors.Green}
              hoverLabel="Jiholarni ko'rish"
            >
              <EyeIcon />
            </Button>
            <Button
              onClick={() => setOjectForProducts(row.id)}
              className="py-2 px-2 text-light"
              bgColor={BgColors.Green}
              hoverLabel="Jiholarni qo'shish"
            >
              <ProductsIcon />
            </Button>
            <Button
              onClick={() => editObyekt(row.id)}
              className="py-2 px-2 text-light"
              bgColor={BgColors.Yellow}
              hoverLabel="Obyektni yangilash"
            >
              <PencilIcon />
            </Button>
            <Button
              onClick={() => downloadPdf(row.id, row.name)}
              className="py-2 px-2 text-light"
              bgColor={BgColors.Navy}
              hoverLabel="PDFda yuklash"
            >
              <DonwloadIcon />
            </Button>
            <Button
              onClick={() => readOnMap(row.id)}
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
