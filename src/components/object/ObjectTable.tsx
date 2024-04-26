import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";
import moment from "moment";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";
import EyeIcon from "../icons/EyeIcon";
import { ShapeIcon } from "../icons/ShapeIcon";
import SettingsIcon from "../icons/SettingsIcon";
import DonwloadIcon from "../icons/DowloadIcon";
import { connectionTypes } from "../../constants/AppConstants";

interface Props {
  readonly data: any;
  readonly loading: boolean;
  readonly selectIds: (value: any) => void;
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
  loading,
  editObyekt,
  downloadPdf,
}: Props) {
  const { translate } = useI18n();

  const headers: any = [
    // {
    //   header: translate("OBJECT_TABLE_ID_COLUMN_TITLE"),
    //   access: "id",
    //   width: 100,
    // },
    {
      header: translate("Yaratilgan vaqti"),
      access: "createdDate",
      width: 140,
      ceil: (row: any) => {
        return <div>{moment(row.createdDate).format("HH:mm | DD.MM.YYYY ")}</div>;
      },
    },
    {
      header: translate("OBJECT_TABLE_PRODUCTS_COLUMN_TITLE"),
      access: "products",
      width: 100,
      ceil: (row: any) => {
        return (
          <span
            className="fw-bold text-success"
            style={{
              cursor: "pointer",
            }}
            onClick={() => setOjectForProducts(row.id)}
          >
            {translate("OBJECT_TABLE_PRODUCTS_VIEW_COLUMN_TITLE")}
          </span>
        );
      },
    },

    {
      header: translate("Ulanish turi"),
      access: "connectionType",
      width: 140,
    },
    {
      header: translate("OBJECT_TABLE_NAME_COLUMN_TITLE"),
      access: "name",
      width: 140,
    },
    {
      header: translate("OBJECT_TABLE_HOME_COLUMN_TITLE"),
      access: "home",
      width: 100,
    },
    {
      header: translate("OBJECT_TABLE_STREET_COLUMN_TITLE"),
      access: "street",
      width: 140,
    },
    // {
    //   header: translate("OBJECT_TABLE_INFO_COLUMN_TITLE"),
    //   access: "info",
    //   width: 200,
    // },
    {
      header: translate("OBJECT_TABLE_LONGITUDE_COLUMN_TITLE"),
      access: "longitude",
      width: 100,
    },
    {
      header: translate("OBJECT_TABLE_LATITUDE_COLUMN_TITLE"),
      access: "latitude",
      width: 100,
    },
    {
      header: translate("Actions"),
      access: "actions",
      width: 140,
      ceil: (row: any) => {
        return (
          <div className="d-flex gap-2">
            <Button
              onClick={() => setOjectForView(row.id)}
              className="py-2 px-2 text-light"
              bgColor={BgColors.Green}
            >
              <EyeIcon />
            </Button>
            <Button
              onClick={() => editObyekt(row.id)}
              className="py-2 px-2 text-light"
              bgColor={BgColors.Yellow}
            >
              <PencilIcon />
            </Button>
            <Button
              onClick={() => downloadPdf(row.id, row.name)}
              className="py-2 px-2 text-light"
              bgColor={BgColors.Navy}
            >
              <DonwloadIcon />
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
