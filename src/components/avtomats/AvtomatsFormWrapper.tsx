import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { AvtomatInitialProps } from "../../api/avtomat/AvtomatDto";
import { useAvtomatApiContext } from "../../api/avtomat/AvtomatApiContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";

import AvtomatsForm from "./AvtomatsForm";

interface Props {
  readonly filter: ObjectFilter;
}

export default function AvtomatsFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState<AvtomatInitialProps>({
    obyektId: 0,
    modelId: 0,
    count: "",
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { AvtomatApi } = useAvtomatApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      AvtomatApi.getOneAvtomat({ id: productId }).then((r) => {
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
  }, [AvtomatApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Avtomat })
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
        AvtomatApi.updateAvtomat(json)
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
        AvtomatApi.createAvtomat(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
          })
          .catch(showError);
      }
    },
    [AvtomatApi, objectId, productId],
  );

  return (
    <AvtomatsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
