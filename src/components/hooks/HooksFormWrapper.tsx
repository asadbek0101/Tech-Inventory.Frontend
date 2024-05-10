import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { HookTypes, HooksInitialProps } from "../../api/hooks/HooksDto";
import { useHooksApiContext } from "../../api/hooks/HooksApiContext";
import HooksForm from "./HooksForm";

interface Props {
  readonly filter: ObjectFilter;
  readonly hookType: HookTypes;
}

export default function HooksFormWrapper({ filter, hookType }: Props) {
  const [initialValues, setInitalValues] = useState<HooksInitialProps>({
    obyektId: 0,
    count: "",
    info: "",
    hookType: hookType,
  });

  const { HooksApi } = useHooksApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      HooksApi.getOneHook({ id: productId })
        .then((r) => setInitalValues(r?.data))
        .catch(showError);
    }
  }, [HooksApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json: HooksInitialProps = {
          ...value,
          id: productId,
          obyektId: objectId,
        };
        HooksApi.updateHook(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      } else {
        const json: HooksInitialProps = {
          ...value,
          obyektId: objectId,
        };
        HooksApi.createHook(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      }
    },
    [HooksApi, objectId],
  );

  return (
    <HooksForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
