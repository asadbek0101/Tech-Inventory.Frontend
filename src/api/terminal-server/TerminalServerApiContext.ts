import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { TerminalServerApi } from "./TerminalServerApi";

interface Props {
  readonly TerminalServerApi: TerminalServerApi;
}

export function useTerminalServerApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new TerminalServerApi(data), [data]);
  return {
    TerminalServerApi: api,
  };
}
