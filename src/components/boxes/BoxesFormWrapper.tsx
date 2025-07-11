import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { BoxesInitialProps } from "../../api/boxes/BoxesDto";
import { useBoxesApiContext } from "../../api/boxes/BoxesApiContext";

import BoxesForm from "./BoxesForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
}

export default function BoxesFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<BoxesInitialProps>({
    obyektId: 0,
    typeId: 0,
    meter: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { BoxesApi } = useBoxesApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      BoxesApi.getOneBoxe({ id: productId }).then((r) => {
        const json = {
          ...r?.data,
          typeId: {
            label: r?.data?.type,
            value: r?.data?.typeId,
          },
        };
        setInitalValues(json);
      });
    }
  }, [BoxesApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Box })
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
          typeId: value.typeId.value,
        };
        BoxesApi.updateBox(json)
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
          typeId: value.typeId.value,
        };
        BoxesApi.createBox(json)
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
    [BoxesApi, objectId, productId],
  );

  return (
    <BoxesForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
