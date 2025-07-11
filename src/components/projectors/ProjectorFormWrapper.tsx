import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { useProjectorApiContext } from "../../api/projectors/ProjectorApiContext";
import { ProjectorInitalProps } from "../../api/projectors/ProjectorDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";

import ProjectorForm from "./ProjectorForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

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

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      ProjectorApi.getOneProjector({ id: productId }).then((r) => {
        const json = {
          ...r?.data,
          modelId: {
            label: r?.data?.model,
            value: r?.data?.modelId,
          },
        };
        setInitialValues(json);
      });
    }
  }, [ProjectorApi, productId]);

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
      if (productId) {
        const json = {
          ...value,
          obyektId: objectId,
          id: productId,
          modelId: value.modelId.value,
        };
        ProjectorApi.updateProjector(json)
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
        ProjectorApi.createProjector(json)
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
    [ProjectorApi, objectId, productId],
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
