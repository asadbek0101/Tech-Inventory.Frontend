import { useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { ModelFilter } from "../../filters/ModelFilter";

import ModelsTableWrapper from "./ModelsTableWrapper";
import ModelsFormWrapper from "./ModelsFormWrapper";

export default function ModelsTab() {
  const { tab = "table" } = useParams();

  const query = useQuery();

  const filter = useMemo(() => new ModelFilter(query) || "", [query]);

  return (
    <>
      {tab === "table" && <ModelsTableWrapper filter={filter} />}
      {tab === "form" && <ModelsFormWrapper filter={filter} />}
    </>
  );
}
