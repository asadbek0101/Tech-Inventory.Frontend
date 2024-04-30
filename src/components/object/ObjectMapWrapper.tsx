import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import ObjectMap from "./ObjectMap";
import { showError } from "../../utils/NotificationUtils";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectMapWrapper({ filter }: Props) {
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const [object, setObject] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { ObyektApi } = useObyektApiContext();

  useEffect(() => {
    ObyektApi.getOneObyekt({ id: objectId })
      .then((r) => {
        const _obects: any = {
          ...r?.data,
          lng: r?.data?.longitude,
          lat: r?.data?.latitude,
        };
        const _center = {
          lng: Number(r?.data?.longitude),
          lat: Number(r?.data?.latitude),
        };
        setObject([_obects]);
        setCenter(_center);
      })
      .catch(showError);
  }, [ObyektApi, objectId]);

  return <ObjectMap center={center} area={object} />;
}
