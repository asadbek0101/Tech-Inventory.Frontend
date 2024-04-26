import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useStabilizerApiContext } from "../../api/stabilizer/StabilizerApiContext";
import { showError } from "../../utils/NotificationUtils";

import StabilizersTable from "./StabilizersTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function StabilizersTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { StabilizerApi } = useStabilizerApiContext();

  useEffect(() => {
    if (objectId) {
      StabilizerApi.getStabilizers({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [StabilizerApi, objectId]);
  return <StabilizersTable data={data} />;
}
