import { useCallback, useEffect, useState } from "react";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import CountersForm from "./CountersForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function CountersFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);
  const { ModelsApi } = useModelsApiContext();

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Counter })
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
      const oldAvtomat = [...initialValues?.counter];

      if (type === "add") {
        oldAvtomat.push({
          modelId: 0,
          numberOfConcern: "",
          info: "",
        });
      }

      if (type === "delete") {
        oldAvtomat.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          counter: oldAvtomat,
        }),
      );
    },
    [initialValues?.counter],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.counter &&
        initialValues?.counter?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <CountersForm
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
