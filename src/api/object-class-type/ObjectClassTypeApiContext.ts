import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ObjectClassTypeApi } from "./ObjectClassTypeApi";

interface Props {
  readonly ObjectClassTypeApi: ObjectClassTypeApi;
}

export function useOjbectClassTypeApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ObjectClassTypeApi(data), [data]);
  return {
    ObjectClassTypeApi: api,
  };
}
