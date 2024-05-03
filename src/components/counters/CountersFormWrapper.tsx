import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { AvtomatInitialProps } from "../../api/avtomat/AvtomatDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { useCountersApiContext } from "../../api/counters/CountersApiContext";
import CountersForm from "./CountersForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function CountersFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<AvtomatInitialProps>({
    obyektId: 0,
    modelId: 0,
    count: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { CountersApi } = useCountersApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

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
      const json = {
        ...value,
        obyektId: objectId,
        modelId: value.modelId.value,
      };
      CountersApi.createCounter(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [CountersApi, objectId],
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
