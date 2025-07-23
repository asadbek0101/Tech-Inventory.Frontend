import { useCallback, useEffect, useState } from "react";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import ProjectorForm from "./ProjectorForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function ProjectorFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);
  const { ModelsApi } = useModelsApiContext();

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Projector })
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
      const oldProduct = [...initialValues?.projector];

      if (type === "add") {
        oldProduct.push({
          modelId: 0,
          count: "",
          info: "",
        });
      }

      if (type === "delete") {
        oldProduct.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          projector: oldProduct,
        }),
      );
    },
    [initialValues?.projector],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.projector &&
        initialValues?.projector?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <ProjectorForm
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
