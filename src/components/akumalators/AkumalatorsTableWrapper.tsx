import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useAkumalatorApiContext } from "../../api/akumalator/AkumalatorApiContext";
import { showError } from "../../utils/NotificationUtils";

import AkumalatorsTable from "./AkumalatorsTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function AkumalatorsTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { AkumalatorApi } = useAkumalatorApiContext();

  useEffect(() => {
    if (objectId) {
      AkumalatorApi.getAkumalators({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [AkumalatorApi, objectId]);
  return <AkumalatorsTable data={data} />;
}
