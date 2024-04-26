import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { AvtomatApi } from "./AvtomatApi";

interface Props {
  readonly AvtomatApi: AvtomatApi;
}

export function useAvtomatApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new AvtomatApi(data), [data]);
  return {
    AvtomatApi: api,
  };
}
