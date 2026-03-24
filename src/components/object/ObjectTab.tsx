import { useMemo } from "react";
import { useQuery } from "../../hooks/useQuery";

import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";

import ObjectTableWrapper from "./ObjectTableWrapper";
import ObjectViewWrapper from "./ObjectViewWrapper";
import ObjectFormWrapper from "./ObjectFormWrapper";

export default function ObjectTab() {
  const query = useQuery();

  const filter = useMemo(() => new ObjectFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || ObjectFilterTabs.ObjectTable, [filter]);

  return (
    <>
      {tab === "object-table" && <ObjectTableWrapper filter={filter} />}
      {tab === "object-form" && <ObjectFormWrapper filter={filter} />}
      {tab === "object-view" && <ObjectViewWrapper filter={filter} />}
    </>
  );
}
