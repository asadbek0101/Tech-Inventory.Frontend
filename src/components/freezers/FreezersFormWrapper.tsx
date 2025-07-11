import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { FreezerInitialProps } from "../../api/freezers/FreezersDto";
import { useFreezersApiContext } from "../../api/freezers/FreezersApiContext";

import FreezersForm from "./FreezersForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
}

export default function FreezersFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<FreezerInitialProps>({
    obyektId: 0,
    count: "",
    info: "",
  });

  const { FreezersApi } = useFreezersApiContext();

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      FreezersApi.getOneFreezer({ id: productId })
        .then((r) => setInitalValues(r?.data))
        .catch(showError);
    }
  }, [FreezersApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
        };
        FreezersApi.updateFreezer(json)
          .then((r) => {
            toast.success(r?.data?.message);
            locationHelpers.pushQuery({
              tab: ObjectFilterTabs.ObjectView,
              objectId: objectId,
            });
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
          obyektId: objectId,
        };
        FreezersApi.createFreezer(json)
          .then((r) => {
            toast.success(r?.data?.message);
            locationHelpers.pushQuery({
              tab: ObjectFilterTabs.ObjectView,
              objectId: objectId,
            });
          })
          .catch(showError);
      }
    },
    [FreezersApi, objectId, productId],
  );

  return (
    <FreezersForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
