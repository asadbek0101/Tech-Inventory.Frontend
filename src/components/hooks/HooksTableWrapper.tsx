import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useHooksApiContext } from "../../api/hooks/HooksApiContext";
import { HookTypes } from "../../api/hooks/HooksDto";
import { ProductTypes } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import HooksTable from "./HooksTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly hookType: HookTypes;
  readonly productForForm?: ProductTypes;
}

export default function HooksTableWrapper({ filter, hookType, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { HooksApi } = useHooksApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      HooksApi.getHooks({ obyektId: objectId, hookType })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [HooksApi, objectId]);
  return (
    <HooksTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        HooksApi.deleteHook({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
