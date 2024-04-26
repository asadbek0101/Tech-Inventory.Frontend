import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useCameraApiContext } from "../../api/cameras/CameraApiContext";

import CameraTable from "./CameraTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function CameraTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { CameraApi } = useCameraApiContext();

  useEffect(() => {
    if (objectId) {
      CameraApi.getCameras({ obyektId: objectId })
        .then((r) => {
          console.log(r);
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [CameraApi, objectId]);

  return <CameraTable data={data} />;
}
