import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { BracketsApi } from "./BracketsApi";

interface Props {
  readonly BracketsApi: BracketsApi;
}

export function useBracketsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new BracketsApi(data), [data]);
  return {
    BracketsApi: api,
  };
}
