import { useMemo } from "react";
import { useQuery } from "../../hooks/useQuery";
import { useParams } from "react-router-dom";
import { ObjectClassFilter } from "../../filters/ObjectClassFilter";

import ObjectClassFormWrapper from "../object-class/ObjectClassFormWrapper";
import ObjectClassTableWrapper from "../object-class/ObjectClassTableWrapper";
import ObjectClassTypeFormWrapper from "./ObjectClassTypeFormWrapper";
import ObjectClassTypeTableWrapper from "./ObjectClassTypeTableWrapper";

export default function ObjectClassTypeTab() {
  const { tab = "class-type-table" } = useParams();

  const query = useQuery();
  const filter = useMemo(() => new ObjectClassFilter(query), [query]);

  return (
    <>
      {tab === "class-type-table" && <ObjectClassTypeTableWrapper filter={filter} />}
      {tab === "class-type-form" && <ObjectClassTypeFormWrapper filter={filter} />}
      {tab === "class-table" && <ObjectClassTableWrapper filter={filter}/>}
      {tab === "class-form" && <ObjectClassFormWrapper filter={filter}/>}
    </>
  );
}
