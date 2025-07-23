import { useCallback, useEffect, useState } from "react";
import { update } from "immupdate";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { showError } from "../../utils/NotificationUtils";
import { ModelTypes } from "../../api/models/ModelsDto";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import SvetaforForCameraForm from "./SvetaforForCameraForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function SvetaforForCameraFormWrapper({
  initialValues,
  setInitialValues,
  title,
}: Props) {
  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { ModelsApi } = useModelsApiContext();

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

  const onChangeProduct = useCallback(
    (index: number, type: "add" | "delete") => {
      const oldProduct = [...initialValues?.svetaforDetektorForCamera];

      if (type === "add") {
        oldProduct.push({
          count: "",
          modelId: null,
          info: "",
        });
      }

      if (type === "delete") {
        oldProduct.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          svetaforDetektorForCamera: oldProduct,
        }),
      );
    },
    [initialValues?.svetaforDetektorForCamera],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.svetaforDetektorForCamera &&
        initialValues?.svetaforDetektorForCamera?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <SvetaforForCameraForm
                index={index}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                models={models}
              />
            </ProductFormItem>
          );
        })}
    </ProductFormGroup>
  );
}
