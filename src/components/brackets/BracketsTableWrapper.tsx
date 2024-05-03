import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useBracketsApiContext } from "../../api/brackets/BracketsApiContext";
import { BracketTypes } from "../../api/brackets/BracketsDto";

import BracketsTable from "./BracketsTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly bracketType: BracketTypes;
}

export default function BracketsTableWrapper({ filter, bracketType }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { BracketsApi } = useBracketsApiContext();

  useEffect(() => {
    if (objectId) {
      BracketsApi.getBrackets({ obyektId: objectId, bracketType })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [BracketsApi, objectId]);
  return <BracketsTable data={data} />;
}
