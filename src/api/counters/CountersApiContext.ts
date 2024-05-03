import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { CountersApi } from "./CountersApi";

interface Props {
  readonly CountersApi: CountersApi;
}

export function useCountersApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new CountersApi(data), [data]);
  return {
    CountersApi: api,
  };
}
