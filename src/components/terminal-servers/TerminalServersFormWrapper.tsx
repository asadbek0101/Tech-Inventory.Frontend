import { useCallback, useEffect, useMemo, useState } from "react";
import { TerminalServerInitialProps } from "../../api/terminal-server/TerminalServerDto";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useTerminalServerApiContext } from "../../api/terminal-server/TerminalServerApiContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { showError } from "../../utils/NotificationUtils";

import TerminalServersForm from "./TerminalServersForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
}

export default function TerminalServersFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<TerminalServerInitialProps>({
    obyektId: 0,
    modelId: 0,
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { TerminalServerApi } = useTerminalServerApiContext();
  const { ModelsApi } = useModelsApiContext();

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      TerminalServerApi.getOneTerminalServer({ id: productId }).then((r) => {
        const json = {
          ...r?.data,
          modelId: {
            label: r?.data?.model,
            value: r?.data?.modelId,
          },
        };
        setInitalValues(json);
      });
    }
  }, []);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.TerminalServer })
      .then((r) => {
        const _models = r?.data.map((sw: any) => {
          return {
            label: sw.name,
            value: sw.id,
          };
        });
        setModels(_models);
      })
      .catch(showError);
  }, [ModelsApi]);

  const onSubmit = useCallback(
    (value: any) => {
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
          modelId: value.modelId.value,
        };
        TerminalServerApi.updateTerminalServer(json)
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
          modelId: value.modelId.value,
        };
        TerminalServerApi.createTerminalServer(json)
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
    [TerminalServerApi, objectId, productId],
  );

  return (
    <TerminalServersForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
