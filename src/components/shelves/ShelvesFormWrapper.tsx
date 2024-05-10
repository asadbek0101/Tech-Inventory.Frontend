import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { ShelfInitialProps, ShelfTypes } from "../../api/shelf/ShelfDto";
import { useNavigate } from "react-router-dom";
import { useShelfApiContext } from "../../api/shelf/ShelfApiContext";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";

import ShelvesForm from "./ShelvesForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
  readonly shelfType: ShelfTypes;
}

export default function ShelvesFormWrapper({ filter, shelfType }: Props) {
  const [initialValues, setInitalValues] = useState<ShelfInitialProps>({
    obyektId: 0,
    number: "",
    info: "",
    serialNumber: "",
    shelfType: shelfType,
  });

  const { ShelfApi } = useShelfApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      ShelfApi.getOneShelf({ id: productId })
        .then((r) => setInitalValues(r?.data))
        .catch(showError);
    }
  }, [ShelfApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
        };
        ShelfApi.updateShelf(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}&product=${product}`);
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
          obyektId: objectId,
        };
        ShelfApi.createShelf(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      }
    },
    [ShelfApi, productId],
  );

  return (
    <ShelvesForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
