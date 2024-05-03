import { useCallback, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { AvtomatInitialProps } from "../../api/avtomat/AvtomatDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useConnectorsApiContext } from "../../api/connectors/ConnectorsApiContext";
import ConnectorsForm from "./ConnectorsForm";
import { ConnectorInitialProps } from "../../api/connectors/ConnectorsDto";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ConnectorsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<ConnectorInitialProps>({
    obyektId: 0,
    count: "",
    info: "",
  });

  const { ConnectorsApi } = useConnectorsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
      };
      ConnectorsApi.createConnector(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [ConnectorsApi, objectId],
  );

  return (
    <ConnectorsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
