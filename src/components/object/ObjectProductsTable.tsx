import { useI18n } from "../../i18n/I18nContext";

import Table from "../table/Table";

interface Props {
  readonly data: any[];
  readonly setProduct: (value: any) => void;
}

export default function ObjectProductsTable({ data, setProduct }: Props) {
  const { translate } = useI18n();

  const headers: any = [
    {
      header: translate("Product Name"),
      access: "name",
      width: 200,
    },
    {
      header: translate("Product Count"),
      access: "count",
      width: 200,
    },
    {
      header: translate("View All"),
      access: "view",
      width: 100,
      ceil: (row: any) => {
        return (
          <span
            style={{
              cursor: "pointer",
              color: "green",
            }}
            onClick={() => setProduct(row.name)}
          >
            View
          </span>
        );
      },
    },
  ];

  return <Table loading={false} headers={headers} data={data} withCheckbox />;
}
