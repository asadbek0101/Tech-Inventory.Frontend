import { useEffect, useState } from "react";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { showError } from "../../utils/NotificationUtils";
import ObjectsMap from "./ObjectsMap";

export default function ObjectsMapWrapper() {
  const [obyekts, setObyekts] = useState([]);

  const { ObyektApi } = useObyektApiContext();

  useEffect(() => {
    ObyektApi.getObyekts("")
      .then((r) => {
        const _obyets = r?.data?.data.map((ob: any) => {
          return {
            ...ob,
            lat: ob.latitude,
            lng: ob.longitude,
          };
        });

        setObyekts(_obyets);
      })
      .catch(showError);
  }, [ObyektApi]);

  return <ObjectsMap objects={obyekts} />;
}
