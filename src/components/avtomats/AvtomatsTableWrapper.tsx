import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useAvtomatApiContext } from "../../api/avtomat/AvtomatApiContext";
import { showError } from "../../utils/NotificationUtils";

import AvtomatsTable from "./AvtomatsTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function AvtomatsTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { AvtomatApi } = useAvtomatApiContext();

  useEffect(() => {
    if (objectId) {
      AvtomatApi.getAvtomats({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [AvtomatApi, objectId]);
  return <AvtomatsTable data={data} />;
}
