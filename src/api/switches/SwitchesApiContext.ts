import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { SwitchesApi } from "./SwitchesApi";

interface Props {
  readonly SwitchesApi: SwitchesApi;
}

export function useSwitchesApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new SwitchesApi(data), [data]);
  return {
    SwitchesApi: api,
  };
}
