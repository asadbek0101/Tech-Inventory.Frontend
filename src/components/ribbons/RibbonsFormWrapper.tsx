import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useRibbonsApiContext } from "../../api/ribbons/RibbonsApiContext";
import { RibbonInitialProps } from "../../api/ribbons/RibbonsDto";
import RibbonsForm from "./RibbonsForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function RibbonsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<RibbonInitialProps>({
    obyektId: 0,
    meter: "",
    info: "",
  });

  const { RibbonsApi } = useRibbonsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      RibbonsApi.getOneRibbon({ id: productId })
        .then((r) => setInitalValues(r?.data))
        .catch(showError);
    }
  }, [RibbonsApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
        };
        RibbonsApi.updateRibbon(json)
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
        RibbonsApi.createRibbon(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      }
    },
    [RibbonsApi, objectId, productId],
  );

  return (
    <RibbonsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
