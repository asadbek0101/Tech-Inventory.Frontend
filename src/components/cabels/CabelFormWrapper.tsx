import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { useCabelApiContext } from "../../api/cabels/CabelApiContext";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { CabelInitialProps, CabelTypes } from "../../api/cabels/CabelDto";

import CabelForm from "./CabelForm";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";

interface Props {
  readonly filter: ObjectFilter;
  readonly cabelType: CabelTypes;
}

export default function CabelFormWrapper({ filter, cabelType }: Props) {
  const [initialValues, setInitialValues] = useState<CabelInitialProps>({
    obyektId: 0,
    cabelTypeId: 0,
    modelId: 0,
    meter: "",
    info: "",
    cabelType: cabelType,
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { CabelApi } = useCabelApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Cabel })
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
      CabelApi.createCabel(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [CabelApi],
  );

  return (
    <CabelForm
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
