import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ShelfApi } from "./ShelfApi";

interface Props {
  readonly ShelfApi: ShelfApi;
}

export function useShelfApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ShelfApi(data), [data]);
  return {
    ShelfApi: api,
  };
}
