import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ProjectsApi } from "./ProjectsApi";

interface Props {
  readonly ProjectsApi: ProjectsApi;
}

export function useProjectApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ProjectsApi(data), [data]);
  return {
    ProjectsApi: api,
  };
}
