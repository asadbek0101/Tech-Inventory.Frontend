import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { useCabelApiContext } from "../../api/cabels/CabelApiContext";
import { showError } from "../../utils/NotificationUtils";
import { CabelTypes } from "../../api/cabels/CabelDto";
import { ProductTypes } from "../../api/AppDto";
import { toast } from "react-toastify";
import CabelTable from "./CabelTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly cabelType: CabelTypes;
  readonly productForForm?: ProductTypes;
}

export default function CabelTableWrapper({ filter, cabelType, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { CabelApi } = useCabelApiContext();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const navigate = useNavigate();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      CabelApi.getCabels({ obyektId: objectId, cabelType })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [CabelApi, objectId]);

  return (
    <CabelTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        CabelApi.deleteCabel({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
