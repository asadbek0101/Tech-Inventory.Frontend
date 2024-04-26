import { useNavigate } from "react-router-dom";
import { useStabilizerApiContext } from "../../api/stabilizer/StabilizerApiContext";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StabilizerInitialProps } from "../../api/stabilizer/StabilizerDto";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";

import StabilizersForm from "./StabilizersForm";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";

interface Props {
  readonly filter: ObjectFilter;
}

export default function StabilizersFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<StabilizerInitialProps>({
    obyektId: 0,
    modelId: 0,
    power: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { StabilizerApi } = useStabilizerApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Stabilizer })
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
        modelId: value?.modelId?.value,
      };
      StabilizerApi.createStabilizer(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [objectId, StabilizerApi, navigate],
  );
  return (
    <StabilizersForm
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      models={models}
      onSubmit={onSubmit}
    />
  );
}
