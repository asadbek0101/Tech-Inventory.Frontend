import { useI18n } from "../../i18n/I18nContext";

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

export default function DistrictTable({ data, loading, seletIds, editDistrict }: Props) {
  const { translate } = useI18n();
  const headers: any = [
    {
      header: translate("DISTRICT_TABLE_ID_COLUMN_TITLE"),
      access: "id",
      width: 100,
    },
    {
      header: translate("DISTRICT_TABLE_DISTRICT_NAME_COLUMN_TITLE"),
      access: "name",
      width: 200,
    },
    {
      header: translate("DISTRICT_TABLE_DISTRICT_INFO_COLUMN_TITLE"),
      access: "info",
      width: 200,
    },
    {
      header: translate("DISTRICT_TABLE_CREATED_DATE_COLUMN_TITLE"),
      access: "createdDate",
      width: 140,
      ceil: (row: any) => {
        return <div>{moment(row.createdDate).format("DD-MM-YYYY")}</div>;
      },
    },
    {
      header: translate("DISTRICT_TABLE_UPDATED_DATE_COLUMN_TITLE"),
      access: "updatedDate",
      width: 140,
    },
    {
      header: translate("DISTRICT_TABLE_CREATED_BY_COLUMN_TITLE"),
      access: "createdBy",
      width: 140,
    },
    {
      header: translate("DISTRICT_TABLE_UPDATED_BY_COLUMN_TITLE"),
      access: "updatedBy",
      width: 140,
    },
    {
      header: translate("DISTRICT_TABLE_DISTRICT_ACTIONS_COLUMN_TITLE"),
      access: "actions",
      width: 100,
      ceil: (row: any) => {
        return (
          <div className="d-flex gap-2">
            <Button
              onClick={() => editDistrict(row.id)}
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
      selectRowCheckbox={seletIds}
    />
  );
}
