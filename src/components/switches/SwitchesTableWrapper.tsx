import { useEffect, useMemo, useState } from "react";
import { SwitchTypes } from "../../api/switches/SwitchesDto";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useSwitchesApiContext } from "../../api/switches/SwitchesApiContext";
import { showError } from "../../utils/NotificationUtils";
import SwitchesTable from "./SwitchesTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly switchType: SwitchTypes;
}

export default function SwitchesTableWrapper({ filter, switchType }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { SwitchesApi } = useSwitchesApiContext();

  useEffect(() => {
    if (objectId) {
      SwitchesApi.getSwitches({ obyektId: objectId, switchType })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [SwitchesApi, objectId, switchType]);
  return <SwitchesTable data={data} />;
}
