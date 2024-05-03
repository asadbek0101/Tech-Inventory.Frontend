import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useCountersApiContext } from "../../api/counters/CountersApiContext";

import CountersTable from "./CountersTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function CountersTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { CountersApi } = useCountersApiContext();

  useEffect(() => {
    if (objectId) {
      CountersApi.getCounters({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [CountersApi, objectId]);
  return <CountersTable data={data} />;
}
