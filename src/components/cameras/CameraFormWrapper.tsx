import { useCallback, useEffect, useMemo, useState } from "react";
import { showError } from "../../utils/NotificationUtils";
import { useCameraApiContext } from "../../api/cameras/CameraApiContext";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CameraForm from "./CameraForm";
import { CameraInitialProps } from "../../api/cameras/CameraDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";

interface Props {
  readonly filter: ObjectFilter;
}

export default function CameraFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<CameraInitialProps>({
    obyektId: 0,
    modelId: 0,
    serialNumber: "",
    ip: "",
    status: "Offline",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { CameraApi } = useCameraApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Camera })
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
      CameraApi.createCamera(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [objectId, CameraApi, navigate],
  );

  return (
    <CameraForm
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
