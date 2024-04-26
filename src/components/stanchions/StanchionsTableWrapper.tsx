import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useStanchionsApiContext } from "../../api/stanchions/StanchionsApiContext";

import StanchionsTable from "./StanchionsTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function StanchionsTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { StanchionsApi } = useStanchionsApiContext();

  useEffect(() => {
    if (objectId) {
      StanchionsApi.getStanchions({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [StanchionsApi, objectId]);
  return <StanchionsTable data={data} />;
}
