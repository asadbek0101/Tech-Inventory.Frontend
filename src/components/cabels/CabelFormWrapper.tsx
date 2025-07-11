import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { useCabelApiContext } from "../../api/cabels/CabelApiContext";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";
import { CabelInitialProps, CabelTypes } from "../../api/cabels/CabelDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";

import CabelForm from "./CabelForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

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

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      CabelApi.getOneCabel({ id: productId }).then((r) => {
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
  }, [CabelApi, productId]);

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
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
          modelId: value.modelId.value,
        };
        CabelApi.updateCabel(json)
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
        CabelApi.createCabel(json)
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
    [CabelApi, productId],
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
