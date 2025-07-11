import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { AvtomatInitialProps } from "../../api/avtomat/AvtomatDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useConnectorsApiContext } from "../../api/connectors/ConnectorsApiContext";
import ConnectorsForm from "./ConnectorsForm";
import { ConnectorInitialProps } from "../../api/connectors/ConnectorsDto";
import useLocationHelpers from "../../hooks/userLocationHelpers";

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

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      ConnectorsApi.getOneConnector({ id: productId })
        .then((r) => setInitalValues(r?.data))
        .catch(showError);
    }
  }, [ConnectorsApi, productId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json = {
          ...value,
          obyektId: objectId,
        };
        ConnectorsApi.updateConnector(json)
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
        ConnectorsApi.createConnector(json)
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
    [ConnectorsApi, objectId, productId],
  );

  return (
    <ConnectorsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
