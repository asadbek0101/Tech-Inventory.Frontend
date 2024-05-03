import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useRibbonsApiContext } from "../../api/ribbons/RibbonsApiContext";
import RibbonsTable from "./RibbonsTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function RibbonsTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { RibbonsApi } = useRibbonsApiContext();

  useEffect(() => {
    if (objectId) {
      RibbonsApi.getRibbons({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [RibbonsApi, objectId]);
  return <RibbonsTable data={data} />;
}
