import { useCallback, useMemo, useState } from "react";
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

  const onSubmit = useCallback(
    (value: any) => {
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
    },
    [AkumalatorApi, objectId],
  );

  return (
    <AkumalatorsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
