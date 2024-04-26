import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { NumberOfOrdersApi } from "./NumberOfOrderApi";

interface Props {
  readonly NumberOfOrdersApi: NumberOfOrdersApi;
}

export function useNumberOfOrdersApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new NumberOfOrdersApi(data), [data]);
  return {
    NumberOfOrdersApi: api,
  };
}
