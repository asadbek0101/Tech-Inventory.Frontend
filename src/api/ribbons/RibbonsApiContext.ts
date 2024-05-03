import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { RibbonsApi } from "./RibbonsApi";

interface Props {
  readonly RibbonsApi: RibbonsApi;
}

export function useRibbonsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new RibbonsApi(data), [data]);
  return {
    RibbonsApi: api,
  };
}
