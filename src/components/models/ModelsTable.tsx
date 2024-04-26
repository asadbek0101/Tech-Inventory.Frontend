import { useI18n } from "../../i18n/I18nContext";
import Table from "../table/Table";
import Button, { BgColors } from "../ui/Button";
import PencilIcon from "../icons/PencilIcon";

interface Props {
  readonly data: any[];
  readonly loading: boolean;
  readonly editRegion: (value: any) => void;
  readonly setIds: (value: any) => void;
}

export default function ModelsTable({ data, loading, editRegion, setIds }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("REGION_TABLE_ID_COLUMN_TITLE"),
      access: "id",
      width: 100,
    },
    {
      header: translate("Model nomi"),
      access: "name",
      width: 200,
    },
    {
      header: translate("Qaysi jihoz uchun"),
      access: "type",
      width: 200,
    },
    {
      header: translate("Qo'shimcha ma'lumot"),
      access: "info",
      width: 200,
    },
    {
      header: translate("Funksiyalar"),
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
