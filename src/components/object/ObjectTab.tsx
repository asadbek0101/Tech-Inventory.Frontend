import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";

import ObjectTableWrapper from "./ObjectTableWrapper";
import ObjectFormWrapper from "./ObjectFormWrapper";
import ObjectViewWrapper from "./ObjectViewWrapper";
import ObjectProductsTabWrapper from "./ObjectProductsTabWrapper";
import ObjectMapWrapper from "./ObjectMapWrapper";
import ObjectPdfWrapper from "./ObjectPdfWrapper";
import ObjectProductsFormWrapper from "./ObjectProductsFormWrapper";

export default function ObjectTab() {
  const query = useQuery();

  const filter = useMemo(() => new ObjectFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || ObjectFilterTabs.ObjectTable, [filter]);

  return (
    <>
      {tab === "object-table" && <ObjectTableWrapper filter={filter} />}
      {tab === "object-form" && <ObjectFormWrapper filter={filter} />}
      {tab === "object-view" && <ObjectViewWrapper filter={filter} />}
      {tab === "object-products" && <ObjectProductsTabWrapper filter={filter} />}
      {tab === "object-view-on" && <ObjectMapWrapper filter={filter} />}
      {tab === "object-pdf-report" && <ObjectPdfWrapper filter={filter} />}
      {tab === "object-products-form" && <ObjectProductsFormWrapper filter={filter} />}
    </>
  );
}
