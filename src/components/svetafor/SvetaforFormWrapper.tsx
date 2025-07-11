import { useCallback, useEffect, useMemo, useState } from "react";
import { SvetaforInitialProps, SvetaforTypes } from "../../api/svetafor/SvetaforDto";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useSvetaforApiContext } from "../../api/svetafor/SvetaforApiContext";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";

import SvetaforForm from "./SvetaforForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

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

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      SvetaforApi.getOneSvetafor({ id: productId }).then((r) => {
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
  }, [productId, SvetaforApi]);

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
      if (productId) {
        const json = {
          ...value,
          id: productId,
          obyektId: objectId,
          modelId: value.modelId.value,
        };
        SvetaforApi.updateSvetafor(json)
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
        SvetaforApi.createSvetafor(json)
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
