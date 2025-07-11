import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useShellsApiContext } from "../../api/shells/ShellsApiContext";
import { ShellInitialProps, ShellTypes } from "../../api/shells/ShellsDto";
import ShellsForm from "./ShellsForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

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

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      ShellsApi.getOneShell({ id: productId })
        .then((r) => setInitalValues(r?.data))
        .catch(showError);
    }
  }, [ShellsApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
        };
        ShellsApi.updateShell(json)
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
        ShellsApi.createShell(json)
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
