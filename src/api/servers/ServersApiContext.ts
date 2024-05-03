import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ServersApi } from "./ServersApi";

interface Props {
  readonly ServersApi: ServersApi;
}

export function useServersApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ServersApi(data), [data]);
  return {
    ServersApi: api,
  };
}
