import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { AvtomatInitialProps } from "../../api/avtomat/AvtomatDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { useMountingBoxApiContext } from "../../api/mounting-box/MountingBoxApiContext";
import { MountingInitialProps } from "../../api/mounting-box/MountingBoxDto";
import MountingBoxForm from "./MountingBoxForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function MountingBoxFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<MountingInitialProps>({
    obyektId: 0,
    modelId: 0,
    count: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { MountingBoxApi } = useMountingBoxApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      MountingBoxApi.getMountingBoxs({ id: productId }).then((r) => {
        const json = {
          ...r?.data,
          modelId: {
            label: r?.data?.model,
            value: r?.data?.modelId,
          },
        };
        setInitalValues(json);
      });
    }
  }, [MountingBoxApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.MountingBox })
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
        MountingBoxApi.updateMountingBox(json)
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
        MountingBoxApi.createMountingBox(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      }
    },
    [MountingBoxApi, objectId, productId],
  );

  return (
    <MountingBoxForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
