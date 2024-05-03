import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useConnectorsApiContext } from "../../api/connectors/ConnectorsApiContext";
import ConnectorsTable from "./ConnectorsTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ConnectorsTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { ConnectorsApi } = useConnectorsApiContext();

  useEffect(() => {
    if (objectId) {
      ConnectorsApi.getConnectors({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [ConnectorsApi, objectId]);
  return <ConnectorsTable data={data} />;
}
