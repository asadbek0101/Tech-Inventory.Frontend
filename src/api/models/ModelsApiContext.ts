import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ModelsApi } from "./ModelsApi";

interface Props {
  readonly ModelsApi: ModelsApi;
}

export function useModelsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ModelsApi(data), [data]);
  return {
    ModelsApi: api,
  };
}
