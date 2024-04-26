import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { DistrictsApi } from "./DistrictsApi";

interface Props {
  readonly DistrictsApi: DistrictsApi;
}

export function useDistrictsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new DistrictsApi(data), [data]);
  return {
    DistrictsApi: api,
  };
}
