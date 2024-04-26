import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { SpeedCheckingApi } from "./SpeedCheckingApi";

interface Props {
  readonly SpeedCheckingApi: SpeedCheckingApi;
}

export function useSpeedCheckingApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new SpeedCheckingApi(data), [data]);
  return {
    SpeedCheckingApi: api,
  };
}
