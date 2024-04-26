import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { SvetaforApi } from "./SvetaforApi";

interface Props {
  readonly SvetaforApi: SvetaforApi;
}

export function useSvetaforApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new SvetaforApi(data), [data]);
  return {
    SvetaforApi: api,
  };
}
