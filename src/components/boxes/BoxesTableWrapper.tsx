import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useBoxesApiContext } from "../../api/boxes/BoxesApiContext";

import BoxesTable from "./BoxesTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function BoxesTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { BoxesApi } = useBoxesApiContext();

  useEffect(() => {
    if (objectId) {
      BoxesApi.getBoxes({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [BoxesApi, objectId]);
  return <BoxesTable data={data} />;
}
