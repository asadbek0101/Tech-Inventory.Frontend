import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { RegionsApi } from "./RegionsApi";

interface Props {
  readonly RegionsApi: RegionsApi;
}

export function useRegionApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new RegionsApi(data), [data]);
  return {
    RegionsApi: api,
  };
}
