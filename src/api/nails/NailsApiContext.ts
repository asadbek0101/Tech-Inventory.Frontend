import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { NailsApi } from "./NailsApi";

interface Props {
  readonly NailsApi: NailsApi;
}

export function useNailsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new NailsApi(data), [data]);
  return {
    NailsApi: api,
  };
}
