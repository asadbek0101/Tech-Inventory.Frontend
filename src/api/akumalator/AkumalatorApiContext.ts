import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { AkumalatorApi } from "./AkumalatorApi";

interface Props {
  readonly AkumalatorApi: AkumalatorApi;
}

export function useAkumalatorApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new AkumalatorApi(data), [data]);
  return {
    AkumalatorApi: api,
  };
}
