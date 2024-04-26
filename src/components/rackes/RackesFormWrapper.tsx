import { useCallback, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { useRackApiContext } from "../../api/rackes/RackesApiContext";

import RackesForm from "./RackesForm";
import { RackTypes, RackesInitialProps } from "../../api/rackes/RackesDto";

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

  const navigate = useNavigate();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
      };
      RackesApi.createRack(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
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
