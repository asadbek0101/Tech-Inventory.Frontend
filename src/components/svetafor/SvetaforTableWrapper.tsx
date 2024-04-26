import { useEffect, useMemo, useState } from "react";
import { SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useSvetaforApiContext } from "../../api/svetafor/SvetaforApiContext";
import { showError } from "../../utils/NotificationUtils";

import SvetaforTable from "./SvetaforTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly svetaforType: SvetaforTypes;
}

export default function SvetaforTableWrapper({ filter, svetaforType }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { SvetaforApi } = useSvetaforApiContext();

  useEffect(() => {
    if (objectId) {
      SvetaforApi.getSvetafors({ obyektId: objectId, svetaforType })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [SvetaforApi, objectId, svetaforType]);
  return <SvetaforTable data={data}/>;
}
