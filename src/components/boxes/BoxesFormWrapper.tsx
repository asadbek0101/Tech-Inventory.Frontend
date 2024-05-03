import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { BoxesInitialProps } from "../../api/boxes/BoxesDto";
import { useBoxesApiContext } from "../../api/boxes/BoxesApiContext";

import BoxesForm from "./BoxesForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function BoxesFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<BoxesInitialProps>({
    obyektId: 0,
    typeId: 0,
    meter: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { BoxesApi } = useBoxesApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Box })
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
        typeId: value.typeId.value,
      };
      BoxesApi.createBox(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [BoxesApi, objectId],
  );

  return (
    <BoxesForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
