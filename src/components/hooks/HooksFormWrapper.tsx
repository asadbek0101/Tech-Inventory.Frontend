import { useCallback, useMemo, useState } from "react";
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

  const onSubmit = useCallback(
    (value: any) => {
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
