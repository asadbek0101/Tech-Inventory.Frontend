import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { StanchionsApi } from "./StanchionsApi";

interface Props {
  readonly StanchionsApi: StanchionsApi;
}

export function useStanchionsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new StanchionsApi(data), [data]);
  return {
    StanchionsApi: api,
  };
}
