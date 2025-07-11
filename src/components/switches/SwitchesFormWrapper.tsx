import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { useSwitchesApiContext } from "../../api/switches/SwitchesApiContext";
import { SwitchInitialProps, SwitchTypes } from "../../api/switches/SwitchesDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";

import SwitchesForm from "./SwitchesForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
  readonly switchType: SwitchTypes;
}

export default function SwitchesFormWrapper({ filter, switchType }: Props) {
  const [initialValues, setInitialValues] = useState<SwitchInitialProps>({
    obyektId: 0,
    modelId: 0,
    countOfPorts: "",
    info: "",
    switchType: switchType,
  });

  const [switchModels, setSwitchModels] = useState<SelectPickerOptionsProps[]>([]);

  const { SwitchesApi } = useSwitchesApiContext();
  const { ModelsApi } = useModelsApiContext();

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      SwitchesApi.getOneSwitch({ id: productId })
        .then((r) => {
          const json = {
            ...r?.data,
            modelId: {
              label: r?.data?.model,
              value: r?.data?.modelId,
            },
          };
          setInitialValues(json);
        })
        .catch(showError);
    }
  }, [SwitchesApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Switch })
      .then((r) => {
        const _switchModels = r?.data.map((sw: any) => {
          return {
            label: sw.name,
            value: sw.id,
          };
        });
        setSwitchModels(_switchModels);
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
        SwitchesApi.updateSwitch(json)
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
        SwitchesApi.createSwitch(json)
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
    [SwitchesApi, objectId, productId],
  );

  return (
    <SwitchesForm
      initialValues={initialValues}
      switchModels={switchModels}
      setInitialValues={setInitialValues}
      onSubmit={onSubmit}
    />
  );
}
