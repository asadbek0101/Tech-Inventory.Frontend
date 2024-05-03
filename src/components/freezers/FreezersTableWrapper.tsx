import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useFreezersApiContext } from "../../api/freezers/FreezersApiContext";
import FreezersTable from "./FreezersTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function FreezersTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { FreezersApi } = useFreezersApiContext();

  useEffect(() => {
    if (objectId) {
      FreezersApi.getFreezers({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [FreezersApi, objectId]);
  return <FreezersTable data={data} />;
}
