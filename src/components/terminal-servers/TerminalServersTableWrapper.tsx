import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import TerminalServerTable from "./TerminalServersTable";
import { useTerminalServerApiContext } from "../../api/terminal-server/TerminalServerApiContext";
import { showError } from "../../utils/NotificationUtils";

interface Props {
  readonly filter: ObjectFilter;
}

export default function TerminalServerTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { TerminalServerApi } = useTerminalServerApiContext();

  useEffect(() => {
    if (objectId) {
      TerminalServerApi.getTerminalServers({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [TerminalServerApi, objectId]);
  return <TerminalServerTable data={data} />;
}
