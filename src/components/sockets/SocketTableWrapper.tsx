import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useSocketApiContext } from "../../api/socket/SocketApiContext";
import { showError } from "../../utils/NotificationUtils";

import SocketTable from "./SocketTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function SocketTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { SocketApi } = useSocketApiContext();

  useEffect(() => {
    if (objectId) {
      SocketApi.getSockets({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [SocketApi, objectId]);
  return <SocketTable data={data} />;
}
