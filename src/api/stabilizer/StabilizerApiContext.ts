import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { StabilizerApi } from "./StabilizerApi";

interface Props {
  readonly StabilizerApi: StabilizerApi;
}

export function useStabilizerApiContext(): Props {
  const data = useApiBase();
  const api = useMemo(() => new StabilizerApi(data), [data]);
  return {
    StabilizerApi: api,
  };
}
