import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { UpsApi } from "./UpsApi";

interface Props {
  readonly UpsApi: UpsApi;
}

export function useUpsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new UpsApi(data), [data]);
  return {
    UpsApi: api,
  };
}
