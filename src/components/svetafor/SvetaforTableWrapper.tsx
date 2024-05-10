import { useEffect, useMemo, useState } from "react";
import { SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useSvetaforApiContext } from "../../api/svetafor/SvetaforApiContext";
import { showError } from "../../utils/NotificationUtils";
import { ProductTypes } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";

import SvetaforTable from "./SvetaforTable";
import { toast } from "react-toastify";

interface Props {
  readonly filter: ObjectFilter;
  readonly svetaforType: SvetaforTypes;
  readonly productForForm?: ProductTypes;
}

export default function SvetaforTableWrapper({ filter, svetaforType, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { SvetaforApi } = useSvetaforApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      SvetaforApi.getSvetafors({ obyektId: objectId, svetaforType })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [SvetaforApi, objectId, svetaforType]);
  return (
    <SvetaforTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        SvetaforApi.deleteSvetafor({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
