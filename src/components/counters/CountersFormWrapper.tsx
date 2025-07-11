import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { AvtomatInitialProps } from "../../api/avtomat/AvtomatDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { useCountersApiContext } from "../../api/counters/CountersApiContext";
import CountersForm from "./CountersForm";
import { CounterInitialProps } from "../../api/counters/CountersDto";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
}

export default function CountersFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<CounterInitialProps>({
    obyektId: 0,
    modelId: 0,
    numberOfConcern: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { CountersApi } = useCountersApiContext();
  const { ModelsApi } = useModelsApiContext();

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      CountersApi.getOneCounter({ id: productId })
        .then((r) => {
          const json = {
            ...r?.data,
            modelId: {
              label: r?.data?.model,
              value: r?.data?.modelId,
            },
          };
          setInitalValues(json);
        })
        .catch(showError);
    }
  }, [CountersApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Counter })
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
        CountersApi.updateCounter(json)
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
        CountersApi.createCounter(json)
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
    [CountersApi, objectId, productId],
  );

  return (
    <CountersForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
