import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useHooksApiContext } from "../../api/hooks/HooksApiContext";
import { HookTypes } from "../../api/hooks/HooksDto";
import HooksTable from "./HooksTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly hookType: HookTypes;
}

export default function HooksTableWrapper({ filter, hookType }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { HooksApi } = useHooksApiContext();

  useEffect(() => {
    if (objectId) {
      HooksApi.getHooks({ obyektId: objectId, hookType })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [HooksApi, objectId]);
  return <HooksTable data={data} />;
}
