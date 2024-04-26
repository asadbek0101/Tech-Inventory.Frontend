import { useMemo } from "react";
import { useApiBase } from "../ApiContext";
import { ObyektApi } from "./ObyektApi";

interface Props {
    readonly ObyektApi: ObyektApi;
}

export function useObyektApiContext(): Props {
    const data = useApiBase();
    const api = useMemo(() => new ObyektApi(data), [data]);
    return {
        ObyektApi: api,
    };
}
