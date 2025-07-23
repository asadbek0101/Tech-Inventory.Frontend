import { useCallback, useEffect, useState } from "react";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import CameraANPRForm from "./CameraANPRForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly title: string;
}

export default function CameraANPRFormWrapper({ initialValues, setInitialValues, title }: Props) {
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
      const oldCamera = [...initialValues?.anprCamera];

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
          anprCamera: oldCamera,
        }),
      );
    },
    [initialValues?.anprCamera],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.anprCamera &&
        initialValues?.anprCamera?.map((_: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <CameraANPRForm
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
