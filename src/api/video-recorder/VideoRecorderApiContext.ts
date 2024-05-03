import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { VideoRecorderApi } from "./VideoRecorderApi";

interface Props {
  readonly VideoRecorderApi: VideoRecorderApi;
}

export function useVideoRecorderApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new VideoRecorderApi(data), [data]);
  return {
    VideoRecorderApi: api,
  };
}
