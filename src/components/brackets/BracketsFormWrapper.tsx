import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { useBracketsApiContext } from "../../api/brackets/BracketsApiContext";
import { BracketsInitialProps } from "../../api/brackets/BracketsDto";
import BracketsForm from "./BracketsForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
}

export default function BracketsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<BracketsInitialProps>({
    obyektId: 0,
    modelId: 0,
    count: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { BracketsApi } = useBracketsApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      BracketsApi.getOneBracket({ id: productId })
        .then((r) => {
          const json = {
            ...r?.data,
            modelId: {
              label: r?.data?.model,
              value: r?.data?.modelId,
            },
          };
          setInitalValues(json);
        })
        .catch(showError);
    }
  }, [BracketsApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Bracket })
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
        BracketsApi.updateBracket(json)
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
        BracketsApi.createBracket(json)
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
    [BracketsApi, objectId, productId],
  );

  return (
    <BracketsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
