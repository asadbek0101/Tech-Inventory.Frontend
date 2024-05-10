import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useAkumalatorApiContext } from "../../api/akumalator/AkumalatorApiContext";
import { showError } from "../../utils/NotificationUtils";
import { ProductTypes } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AkumalatorsTable from "./AkumalatorsTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
}

export default function AkumalatorsTableWrapper({ filter, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { AkumalatorApi } = useAkumalatorApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      AkumalatorApi.getAkumalators({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [AkumalatorApi, objectId]);
  return (
    <AkumalatorsTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        AkumalatorApi.deleteAkumalator({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
