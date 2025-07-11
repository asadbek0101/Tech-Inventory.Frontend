import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { StanchionsInitialProps } from "../../api/stanchions/StanchionsDto";
import { useStanchionsApiContext } from "../../api/stanchions/StanchionsApiContext";
import StanchionsForm from "./StanchionsForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
}

export default function StanchionsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<StanchionsInitialProps>({
    obyektId: 0,
    stanchionTypeId: 0,
    count: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { StanchionsApi } = useStanchionsApiContext();
  const { ModelsApi } = useModelsApiContext();

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      StanchionsApi.getOneStanchion({ id: productId }).then((r) => {
        const json = {
          ...r?.data,
          stanchionTypeId: {
            label: r?.data?.stanchionType,
            value: r?.data?.stanchionTypeId,
          },
        };
        setInitalValues(json);
      });
    }
  }, [StanchionsApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Stanchion })
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
          stanchionTypeId: value.stanchionTypeId.value,
        };
        StanchionsApi.updateStanchion(json)
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
          stanchionTypeId: value.stanchionTypeId.value,
        };
        StanchionsApi.createStanchion(json)
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
    [StanchionsApi, objectId, productId],
  );

  return (
    <StanchionsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
