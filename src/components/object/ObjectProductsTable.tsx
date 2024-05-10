import { useI18n } from "../../i18n/I18nContext";

import Table from "../table/Table";

interface Props {
  readonly data: any[];
  readonly setProduct: (value: any) => void;
}

export default function ObjectProductsTable({ data, setProduct }: Props) {
  const { translate } = useI18n();

  const columns: any = [
    {
      Header: translate("Product Name"),
      accessor: "name",
      width: 200,
    },
    {
      Header: translate("Product Count"),
      accessor: "count",
      width: 200,
    },
    {
      Header: translate("View All"),
      accessor: "view",
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

  return <Table loading={false} columns={columns} data={data} />;
}
