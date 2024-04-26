import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { AttachmentsApi } from "./AttachmentsApi";

interface Props {
  readonly AttachmentsApi: AttachmentsApi;
}

export function useAttachmentsApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new AttachmentsApi(data), [data]);
  return {
    AttachmentsApi: api,
  };
}
