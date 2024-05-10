import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useSocketApiContext } from "../../api/socket/SocketApiContext";
import { showError } from "../../utils/NotificationUtils";
import { ProductTypes } from "../../api/AppDto";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SocketTable from "./SocketTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
}

export default function SocketTableWrapper({ filter, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { SocketApi } = useSocketApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      SocketApi.getSockets({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [SocketApi, objectId]);
  return (
    <SocketTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        SocketApi.deleteSocket({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
