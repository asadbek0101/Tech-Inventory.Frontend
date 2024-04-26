import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ObjectClassApi } from "./ObjectClassApi";

interface Props {
  readonly ObjectClassApi: ObjectClassApi;
}

export function useOjbectClassApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new ObjectClassApi(data), [data]);
  return {
    ObjectClassApi: api,
  };
}
