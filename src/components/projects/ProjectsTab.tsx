import { useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { ProjectFilter } from "../../filters/ProjectFilter";

import NumberOfOrdersTableWrapper from "../number-of-orders/NumberOfOrderTableWrapper";
import NumberOfOrderFormWrapper from "../number-of-orders/NumberOfOrderFormWrapper";
import ProjectsTableWrapper from "./ProjectsTableWrapper";
import ProjectsFormWrapper from "./ProjectsFormWrapper";

export default function ProjectsTab() {
  const { tab = "project-table" } = useParams();

  const query = useQuery();

  const projectFilter = useMemo(() => new ProjectFilter(query), [query]);

  return (
    <>
      {tab === "project-table" && <ProjectsTableWrapper filter={projectFilter} />}
      {tab === "project-form" && <ProjectsFormWrapper filter={projectFilter} />}
      {tab === "number-of-order-table" && <NumberOfOrdersTableWrapper filter={projectFilter} />}
      {tab === "number-of-order-form" && <NumberOfOrderFormWrapper filter={projectFilter} />}
    </>
  );
}
