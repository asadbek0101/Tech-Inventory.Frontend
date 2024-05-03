import { useCallback, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useRibbonsApiContext } from "../../api/ribbons/RibbonsApiContext";
import { RibbonInitialProps } from "../../api/ribbons/RibbonsDto";
import RibbonsForm from "./RibbonsForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function RibbonsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<RibbonInitialProps>({
    obyektId: 0,
    meter: "",
    info: "",
  });

  const { RibbonsApi } = useRibbonsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
      };
      RibbonsApi.createRibbon(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [RibbonsApi, objectId],
  );

  return (
    <RibbonsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
