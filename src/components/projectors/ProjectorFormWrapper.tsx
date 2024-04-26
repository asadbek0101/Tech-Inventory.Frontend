import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { useProjectorApiContext } from "../../api/projectors/ProjectorApiContext";
import { ProjectorInitalProps } from "../../api/projectors/ProjectorDto";

import ProjectorForm from "./ProjectorForm";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ProjectorFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<ProjectorInitalProps>({
    obyektId: 0,
    modelId: 0,
    count: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { ProjectorApi } = useProjectorApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Projector })
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
      ProjectorApi.createProjector(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [ProjectorApi, objectId],
  );

  return (
    <ProjectorForm
      onSubmit={onSubmit}
      models={models}
      initialValues={initialValues}
      setInitialValues={setInitialValues}
    />
  );
}
