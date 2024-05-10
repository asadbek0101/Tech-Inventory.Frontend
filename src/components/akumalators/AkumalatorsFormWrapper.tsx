import { useCallback, useEffect, useMemo, useState } from "react";
import { AkumalatorInitialProps } from "../../api/akumalator/AkumalatorDto";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useAkumalatorApiContext } from "../../api/akumalator/AkumalatorApiContext";

import AkumalatorsForm from "./AkumalatorsForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function AkumalatorsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<AkumalatorInitialProps>({
    obyektId: 0,
    power: "",
    count: "",
    info: "",
  });

  const { AkumalatorApi } = useAkumalatorApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      AkumalatorApi.getOneAkumalator({ id: productId })
        .then((r) => setInitalValues(r?.data))
        .catch(showError);
    }
  }, [AkumalatorApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
        };
        AkumalatorApi.updateAkumalator(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
          obyektId: objectId,
        };
        AkumalatorApi.createAkumalator(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      }
    },
    [AkumalatorApi, objectId, productId],
  );

  return (
    <AkumalatorsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
