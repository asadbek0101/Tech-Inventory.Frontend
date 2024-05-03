import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { ShellTypes } from "../../api/shells/ShellsDto";
import { useShellsApiContext } from "../../api/shells/ShellsApiContext";
import ShellsTable from "./ShellsTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly shellType: ShellTypes;
}

export default function ShellsTableWrapper({ filter, shellType }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { ShellsApi } = useShellsApiContext();

  useEffect(() => {
    if (objectId) {
      ShellsApi.getShells({ obyektId: objectId, shellType })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [ShellsApi, objectId]);
  return <ShellsTable data={data} />;
}
