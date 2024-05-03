import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ShellsApi } from "./ShellsApi";

interface Props {
  readonly ShellsApi: ShellsApi;
}

export function useShellsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ShellsApi(data), [data]);
  return {
    ShellsApi: api,
  };
}
