import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useNailsApiContext } from "../../api/nails/NailsApiContext";
import { ProductTypes } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NailsTable from "./NailsTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
}

export default function NailsTableWrapper({ filter, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { NailsApi } = useNailsApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      NailsApi.getNails({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [NailsApi, objectId]);
  return (
    <NailsTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        NailsApi.deleteNail({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
