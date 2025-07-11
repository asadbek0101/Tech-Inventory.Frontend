import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { HooksInitialProps } from "../../api/hooks/HooksDto";
import { GluesInitialProps } from "../../api/glues/GluesDto";
import { useGluesApiContext } from "../../api/glues/GluesApiContext";

import useLocationHelpers from "../../hooks/userLocationHelpers";
import GluesForm from "./GluesForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function GluesFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<GluesInitialProps>({
    obyektId: 0,
    countOfCrate: "",
    info: "",
  });

  const { GluesApi } = useGluesApiContext();

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      GluesApi.getOneGlue({ id: productId })
        .then((r) => setInitalValues(r?.data))
        .catch(showError);
    }
  }, [GluesApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json: HooksInitialProps = {
          ...value,
          id: productId,
          obyektId: Number(objectId),
        };
        GluesApi.updateGlue(json)
          .then((r) => {
            toast.success(r?.data?.message);
            locationHelpers.pushQuery({
              tab: ObjectFilterTabs.ObjectView,
              objectId: Number(objectId),
            });
          })
          .catch(showError);
      } else {
        const json: GluesInitialProps = {
          ...value,
          obyektId: Number(objectId),
        };
        GluesApi.createGlue(json)
          .then((r) => {
            toast.success(r?.data?.message);
            locationHelpers.pushQuery({
              tab: ObjectFilterTabs.ObjectView,
              objectId: Number(objectId),
            });
          })
          .catch(showError);
      }
    },
    [GluesApi, objectId],
  );

  return (
    <GluesForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
