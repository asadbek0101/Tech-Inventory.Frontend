import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useServersApiContext } from "../../api/servers/ServersApiContext";

import ServersTable from "./ServersTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ServersTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { ServersApi } = useServersApiContext();

  useEffect(() => {
    if (objectId) {
      ServersApi.getServers({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [ServersApi, objectId]);
  return <ServersTable data={data} />;
}
