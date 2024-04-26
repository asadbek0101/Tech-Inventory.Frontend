import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ProjectorApi } from "./ProjectorApi";

interface Props {
  readonly ProjectorApi: ProjectorApi;
}

export function useProjectorApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ProjectorApi(data), [data]);
  return {
    ProjectorApi: api,
  };
}
