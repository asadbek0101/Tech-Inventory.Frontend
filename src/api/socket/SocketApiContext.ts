import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { SocketApi } from "./SocketApi";

interface Props {
  readonly SocketApi: SocketApi;
}

export function useSocketApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new SocketApi(data), [data]);
  return {
    SocketApi: api,
  };
}
