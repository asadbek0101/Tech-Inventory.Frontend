import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { CabelApi } from "./CabelApi";

interface Props {
  readonly CabelApi: CabelApi;
}

export function useCabelApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new CabelApi(data), [data]);
  return {
    CabelApi: api,
  };
}
