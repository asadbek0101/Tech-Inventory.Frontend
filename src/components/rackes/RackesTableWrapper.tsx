import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useRackApiContext } from "../../api/rackes/RackesApiContext";
import { RackTypes } from "../../api/rackes/RackesDto";
import { showError } from "../../utils/NotificationUtils";

import RackesTable from "./RackesTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly rackType: RackTypes;
}

export default function RackesTableWrapper({ filter, rackType }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { RackesApi } = useRackApiContext();

  useEffect(() => {
    if (objectId) {
      RackesApi.getRackes({ obyektId: objectId, rackType })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [RackesApi, objectId, rackType]);

  return <RackesTable data={data} />;
}
