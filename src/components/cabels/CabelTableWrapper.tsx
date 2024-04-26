import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import CabelTable from "./CabelTable";
import { useNavigate } from "react-router-dom";
import { useCabelApiContext } from "../../api/cabels/CabelApiContext";
import { showError } from "../../utils/NotificationUtils";
import { CabelTypes } from "../../api/cabels/CabelDto";

interface Props {
  readonly filter: ObjectFilter;
  readonly cabelType: CabelTypes;
}

export default function CabelTableWrapper({ filter, cabelType }: Props) {
  const [data, setData] = useState<any>([]);

  const { CabelApi } = useCabelApiContext();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const navigate = useNavigate();

  useEffect(() => {
    if (objectId) {
      CabelApi.getCabels({ obyektId: objectId, cabelType })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [CabelApi, objectId]);

  return <CabelTable data={data} />;
}
