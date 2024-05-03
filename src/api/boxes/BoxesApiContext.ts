import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { BoxesApi } from "./BoxesApi";

interface Props {
  readonly BoxesApi: BoxesApi;
}

export function useBoxesApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new BoxesApi(data), [data]);
  return {
    BoxesApi: api,
  };
}
