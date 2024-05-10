import { useCallback, useEffect, useMemo, useState } from "react";
import { showError } from "../../utils/NotificationUtils";
import { useCameraApiContext } from "../../api/cameras/CameraApiContext";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CameraInitialProps, CameraTypes } from "../../api/cameras/CameraDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";

import CameraForm from "./CameraForm";

interface Props {
  readonly filter: ObjectFilter;
  readonly cameraType: CameraTypes;
}

export default function CameraFormWrapper({ filter, cameraType }: Props) {
  const [initialValues, setInitialValues] = useState<CameraInitialProps>({
    obyektId: 0,
    modelId: 0,
    serialNumber: "",
    ip: "",
    status: "Offline",
    info: "",
    cameraType: cameraType,
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { CameraApi } = useCameraApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      CameraApi.getOneCamera({ id: productId })
        .then((r) => {
          const json = {
            ...r?.data,
            modelId: {
              label: r?.data?.model,
              value: r?.data?.modelId,
            },
          };
          setInitialValues(json);
        })
        .catch(showError);
    }
  }, [CameraApi, productId]);

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
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
          modelId: value.modelId.value,
        };
        CameraApi.updateCamera(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      } else {
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
      }
    },
    [objectId, CameraApi, navigate, productId],
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
