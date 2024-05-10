import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useStabilizerApiContext } from "../../api/stabilizer/StabilizerApiContext";
import { showError } from "../../utils/NotificationUtils";
import { ProductTypes } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import StabilizersTable from "./StabilizersTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
}

export default function StabilizersTableWrapper({ filter, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { StabilizerApi } = useStabilizerApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      StabilizerApi.getStabilizers({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [StabilizerApi, objectId]);
  return (
    <StabilizersTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        StabilizerApi.deleteStabilizer({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
