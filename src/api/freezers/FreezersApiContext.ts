import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { FreezersApi } from "./FreezersApi";

interface Props {
  readonly FreezersApi: FreezersApi;
}

export function useFreezersApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new FreezersApi(data), [data]);
  return {
    FreezersApi: api,
  };
}
