import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { useRackApiContext } from "../../api/rackes/RackesApiContext";
import { RackTypes, RackesInitialProps } from "../../api/rackes/RackesDto";

import RackesForm from "./RackesForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
  readonly rackType: RackTypes;
}

export default function RackesFormWrapper({ filter, rackType }: Props) {
  const [initialValues, setInitialValues] = useState<RackesInitialProps>({
    obyektId: 0,
    numberOfFibers: "",
    countOfPorts: "",
    typeOfAdapter: "",
    info: "",
    rackType: rackType,
  });

  const { RackesApi } = useRackApiContext();
  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      RackesApi.getOneRack({ id: productId })
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [RackesApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
        };
        RackesApi.updateRack(json)
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
        RackesApi.createRack(json)
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
    [RackesApi],
  );

  return (
    <RackesForm
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      onSubmit={onSubmit}
    />
  );
}
