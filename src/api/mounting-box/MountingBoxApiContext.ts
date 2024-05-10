import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { MountingBoxApi } from "./MountingBoxApi";

interface Props {
  readonly MountingBoxApi: MountingBoxApi;
}

export function useMountingBoxApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new MountingBoxApi(data), [data]);
  return {
    MountingBoxApi: api,
  };
}
