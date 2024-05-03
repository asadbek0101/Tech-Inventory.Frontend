import { useCallback, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useShellsApiContext } from "../../api/shells/ShellsApiContext";
import { ShellInitialProps, ShellTypes } from "../../api/shells/ShellsDto";
import ShellsForm from "./ShellsForm";

interface Props {
  readonly filter: ObjectFilter;
  readonly shellType: ShellTypes;
}

export default function ShellsFormWrapper({ filter, shellType }: Props) {
  const [initialValues, setInitalValues] = useState<ShellInitialProps>({
    obyektId: 0,
    meter: "",
    info: "",
    shellType: shellType,
  });

  const { ShellsApi } = useShellsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
      };
      ShellsApi.createShell(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [ShellsApi, objectId],
  );

  return (
    <ShellsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
