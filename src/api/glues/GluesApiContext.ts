import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { GluesApi } from "./GluesApi";

interface Props {
  readonly GluesApi: GluesApi;
}

export function useGluesApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new GluesApi(data), [data]);
  return {
    GluesApi: api,
  };
}
