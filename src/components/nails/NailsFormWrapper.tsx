import { useCallback, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { NailInitialProps } from "../../api/nails/NailsDto";
import { useNailsApiContext } from "../../api/nails/NailsApiContext";
import NailsForm from "./NailsForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function NailsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<NailInitialProps>({
    obyektId: 0,
    weight: "",
    info: "",
  });

  const { NailsApi } = useNailsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
      };
      NailsApi.createNail(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [NailsApi, objectId],
  );

  return (
    <NailsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
