import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useShelfApiContext } from "../../api/shelf/ShelfApiContext";
import { ShelfTypes } from "../../api/shelf/ShelfDto";
import ShelvesTable from "./ShelvesTable";
import { showError } from "../../utils/NotificationUtils";

interface Props {
  readonly filter: ObjectFilter;
  readonly shelfType: ShelfTypes;
}

export default function ShelvesTableWrapper({ filter, shelfType }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { ShelfApi } = useShelfApiContext();

  useEffect(() => {
    if (objectId) {
      ShelfApi.getShelves({ obyektId: objectId, shelfType })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [ShelfApi, objectId, shelfType]);

  return <ShelvesTable data={data} />;
}
