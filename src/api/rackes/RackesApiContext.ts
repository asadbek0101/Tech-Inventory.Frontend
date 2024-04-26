import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { RackesApi } from "./RackesApi";

interface Props {
  readonly RackesApi: RackesApi;
}

export function useRackApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new RackesApi(data), [data]);
  return {
    RackesApi: api,
  };
}
