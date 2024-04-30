import { useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";

import ObjectTableWrapper from "./ObjectTableWrapper";
import ObjectFormWrapper from "./ObjectFormWrapper";
import ObjectViewWrapper from "./ObjectViewWrapper";
import ObjectProductsTabWrapper from "./ObjectProductsTabWrapper";
import ObjectMapWrapper from "./ObjectMapWrapper";

export default function ObjectTab() {
  const { tab = "object-table" } = useParams();

  const query = useQuery();

  const filter = useMemo(() => new ObjectFilter(query), [query]);

  return (
    <>
      {tab === "object-table" && <ObjectTableWrapper filter={filter} />}
      {tab === "object-form" && <ObjectFormWrapper filter={filter} />}
      {tab === "object-view" && <ObjectViewWrapper filter={filter} />}
      {tab === "object-products" && <ObjectProductsTabWrapper filter={filter} />}
      {tab === "object-view-on" && <ObjectMapWrapper filter={filter} />}
    </>
  );
}
