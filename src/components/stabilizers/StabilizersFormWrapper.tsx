import { useNavigate } from "react-router-dom";
import { useStabilizerApiContext } from "../../api/stabilizer/StabilizerApiContext";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useCallback, useEffect, useMemo, useState } from "react";
import { StabilizerInitialProps } from "../../api/stabilizer/StabilizerDto";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";

import StabilizersForm from "./StabilizersForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

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

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      StabilizerApi.getOneStabilizer({ id: productId }).then((r) => {
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
  }, [StabilizerApi, productId]);

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
      if (productId) {
        console.log(value);
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
          modelId: value?.modelId?.value,
        };
        StabilizerApi.updateStabilizer(json)
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
          modelId: value?.modelId?.value,
        };
        StabilizerApi.createStabilizer(json)
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
    [objectId, StabilizerApi, productId],
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
