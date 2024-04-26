import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useUpsApiContext } from "../../api/ups/UpsApiContext";
import { showError } from "../../utils/NotificationUtils";
import UpsTable from "./UpsTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function UpsTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { UpsApi } = useUpsApiContext();

  useEffect(() => {
    if (objectId) {
      UpsApi.getUpses({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [UpsApi, objectId]);
  return <UpsTable data={data} />;
}
