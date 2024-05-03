import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { HooksApi } from "./HooksApi";

interface Props {
  readonly HooksApi: HooksApi;
}

export function useHooksApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new HooksApi(data), [data]);
  return {
    HooksApi: api,
  };
}
