import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useShelfApiContext } from "../../api/shelf/ShelfApiContext";
import { ShelfTypes } from "../../api/shelf/ShelfDto";
import { showError } from "../../utils/NotificationUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ShelvesTable from "./ShelvesTable";
import { ProductTypes } from "../../api/AppDto";

interface Props {
  readonly filter: ObjectFilter;
  readonly shelfType: ShelfTypes;
  readonly productForForm?: ProductTypes;
}

export default function ShelvesTableWrapper({ filter, shelfType, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { ShelfApi } = useShelfApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      ShelfApi.getShelves({ obyektId: objectId, shelfType })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [ShelfApi, objectId, shelfType]);

  return (
    <ShelvesTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        ShelfApi.deleteShelf({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
