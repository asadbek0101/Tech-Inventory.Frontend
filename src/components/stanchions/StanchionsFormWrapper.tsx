import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { StanchionsInitialProps } from "../../api/stanchions/StanchionsDto";
import { useStanchionsApiContext } from "../../api/stanchions/StanchionsApiContext";
import StanchionsForm from "./StanchionsForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function StanchionsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<StanchionsInitialProps>({
    obyektId: 0,
    stanchionTypeId: 0,
    count: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { StanchionsApi } = useStanchionsApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Stanchion })
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
        stanchionTypeId: value.stanchionTypeId.value,
      };
      StanchionsApi.createStanchion(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [StanchionsApi, objectId],
  );

  return (
    <StanchionsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
