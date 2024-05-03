import { useCallback, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { FreezerInitialProps } from "../../api/freezers/FreezersDto";
import { useFreezersApiContext } from "../../api/freezers/FreezersApiContext";
import FreezersForm from "./FreezersForm";

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

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
      };
      FreezersApi.createFreezer(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [FreezersApi, objectId],
  );

  return (
    <FreezersForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
