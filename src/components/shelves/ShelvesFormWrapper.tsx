import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { ShelfInitialProps, ShelfTypes } from "../../api/shelf/ShelfDto";
import { useNavigate } from "react-router-dom";
import { useShelfApiContext } from "../../api/shelf/ShelfApiContext";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";

import ShelvesForm from "./ShelvesForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";

interface Props {
  readonly filter: ObjectFilter;
  readonly shelfType: ShelfTypes;
}

export default function ShelvesFormWrapper({ filter, shelfType }: Props) {
  const [initialValues, setInitalValues] = useState<ShelfInitialProps>({
    obyektId: 0,
    brandId: 0,
    number: "",
    info: "",
    serialNumber: "",
    shelfType: shelfType,
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { ShelfApi } = useShelfApiContext();
  const { ModelsApi } = useModelsApiContext();

  const locationHelpers = useLocationHelpers();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const productId = useMemo(() => filter.getProductId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || 0, [filter]);

  useEffect(() => {
    if (productId) {
      ShelfApi.getOneShelf({ id: productId })
        .then((r) => {
          const json = {
            ...r?.data,
            brandId: {
              label: r?.data?.brand,
              value: r?.data?.brandId,
            },
          };
          setInitalValues(json);
        })
        .catch(showError);
    }
  }, [ShelfApi, productId]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Shelf })
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
          brandId: value?.brandId?.value,
        };
        ShelfApi.updateShelf(json)
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
          brandId: value?.brandId?.value,
        };
        ShelfApi.createShelf(json)
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
    [ShelfApi, productId],
  );

  return (
    <ShelvesForm
      models={models}
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
