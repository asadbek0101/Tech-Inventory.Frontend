import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { ProductTypes } from "../../api/AppDto";
import { useSpeedCheckingApiContext } from "../../api/speed-checking/SpeedCheckingApiContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import SpeedCheckingTable from "./SpeedCheckingTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
}

export default function SpeedCheckingTableWrapper({ filter, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { SpeedCheckingApi } = useSpeedCheckingApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      SpeedCheckingApi.getSpeedCheckings({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [SpeedCheckingApi, objectId]);
  return (
    <SpeedCheckingTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        SpeedCheckingApi.deleteSpeedChecking({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
