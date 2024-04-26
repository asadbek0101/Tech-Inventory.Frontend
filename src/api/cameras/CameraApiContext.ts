import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { CameraApi } from "./CameraApi";

interface Props {
  readonly CameraApi: CameraApi;
}

export function useCameraApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new CameraApi(data), [data]);
  return {
    CameraApi: api,
  };
}
