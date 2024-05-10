import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useBracketsApiContext } from "../../api/brackets/BracketsApiContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductTypes } from "../../api/AppDto";

import BracketsTable from "./BracketsTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
}

export default function BracketsTableWrapper({ filter, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { BracketsApi } = useBracketsApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      BracketsApi.getBrackets({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [BracketsApi, objectId]);
  return (
    <BracketsTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        BracketsApi.deleteBracket({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
