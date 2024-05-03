import { useCallback, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useServersApiContext } from "../../api/servers/ServersApiContext";
import { ServerInitialProps } from "../../api/servers/ServersDto";
import ServersForm from "./ServersForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ServersFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<ServerInitialProps>({
    obyektId: 0,
    ip: "",
    info: "",
  });

  const { ServersApi } = useServersApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
      };
      ServersApi.createServer(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [ServersApi, objectId],
  );

  return (
    <ServersForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
