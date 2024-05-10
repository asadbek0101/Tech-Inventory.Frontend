import { useCallback, useEffect, useMemo, useState } from "react";
import { UpsInitialProps } from "../../api/ups/UpsDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { useUpsApiContext } from "../../api/ups/UpsApiContext";
import { useNavigate } from "react-router-dom";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { toast } from "react-toastify";

import UpsForm from "./UpsForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function UpsFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<UpsInitialProps>({
    obyektId: 0,
    modelId: 0,
    power: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { UpsApi } = useUpsApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      UpsApi.getOneUps({ id: productId })
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
  }, [UpsApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Ups })
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
        UpsApi.updateUps(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
          obyektId: objectId,
          modelId: value.modelId.value,
        };
        UpsApi.createUps(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      }
    },
    [UpsApi, objectId],
  );

  return (
    <UpsForm
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
