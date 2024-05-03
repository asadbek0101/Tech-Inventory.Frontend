import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ConnectorsApi } from "./ConnectorsApi";

interface Props {
  readonly ConnectorsApi: ConnectorsApi;
}

export function useConnectorsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ConnectorsApi(data), [data]);
  return {
    ConnectorsApi: api,
  };
}
