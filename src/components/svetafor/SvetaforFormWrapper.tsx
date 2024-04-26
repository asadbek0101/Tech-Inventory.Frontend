import { useCallback, useEffect, useMemo, useState } from "react";
import { SvetaforInitialProps, SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useSvetaforApiContext } from "../../api/svetafor/SvetaforApiContext";

import SvetaforForm from "./SvetaforForm";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";

interface Props {
  readonly filter: ObjectFilter;
  readonly svetaforType: SvetaforTypes;
}

export default function SvetaforFormWrapper({ filter, svetaforType }: Props) {
  const [initialValues, setInitialValues] = useState<SvetaforInitialProps>({
    obyektId: 0,
    modelId: 0,
    name: "",
    countOfPorts: "",
    info: "",
    svetaforType: svetaforType,
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { SvetaforApi } = useSvetaforApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Svetafor })
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
      SvetaforApi.createSvetafor(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [SvetaforApi, objectId],
  );

  return (
    <SvetaforForm
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      models={models}
      onSubmit={onSubmit}
    />
  );
}
