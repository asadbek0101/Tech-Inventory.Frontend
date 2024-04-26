import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useSpeedCheckingApiContext } from "../../api/speed-checking/SpeedCheckingApiContext";

import SpeedCheckingTable from "./SpeedCheckingTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function SpeedCheckingTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { SpeedCheckingApi } = useSpeedCheckingApiContext();

  useEffect(() => {
    if (objectId) {
      SpeedCheckingApi.getSpeedCheckings({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [SpeedCheckingApi, objectId]);
  return <SpeedCheckingTable data={data} />;
}
