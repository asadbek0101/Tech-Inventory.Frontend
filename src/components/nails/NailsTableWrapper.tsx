import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useNailsApiContext } from "../../api/nails/NailsApiContext";
import NailsTable from "./NailsTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function NailsTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { NailsApi } = useNailsApiContext();

  useEffect(() => {
    if (objectId) {
      NailsApi.getNails({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [NailsApi, objectId]);
  return <NailsTable data={data} />;
}
