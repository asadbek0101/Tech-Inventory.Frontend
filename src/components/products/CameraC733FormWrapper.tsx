import { useCallback, useEffect, useState } from "react";
import { CameraTypes } from "../../api/cameras/CameraDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import CameraC733Form from "./CameraC733Form";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly title: string;
}

export default function CameraC733FormWrapper({ initialValues, setInitialValues, title }: Props) {
  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { ModelsApi } = useModelsApiContext();

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Camera })
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
      const oldCamera = [...initialValues?.c733Camera];

      if (type === "add") {
        oldCamera.push({
          modelId: 0,
          serialNumber: "",
          ip: "",
          status: "Offline",
          info: "",
        });
      }

      if (type === "delete") {
        oldCamera.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          c733Camera: oldCamera,
        }),
      );
    },
    [initialValues?.c733Camera],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.c733Camera &&
        initialValues?.c733Camera?.map((_: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <CameraC733Form
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
