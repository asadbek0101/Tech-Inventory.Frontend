import { useCallback, useEffect, useState } from "react";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import PoeSwitchesForm from "./PoeSwitchesForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function PoeSwitchesFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const [switchModels, setSwitchModels] = useState<SelectPickerOptionsProps[]>([]);
  const { ModelsApi } = useModelsApiContext();
  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Switch })
      .then((r) => {
        const _switchModels = r?.data.map((sw: any) => {
          return {
            label: sw.name,
            value: sw.id,
          };
        });
        setSwitchModels(_switchModels);
      })
      .catch(showError);
  }, [ModelsApi]);

  const onChangeProduct = useCallback(
    (index: number, type: "add" | "delete") => {
      const oldProduct = [...initialValues?.switchPoe];

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
          switchPoe: oldProduct,
        }),
      );
    },
    [initialValues?.switchPoe],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.switchPoe &&
        initialValues?.switchPoe?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <PoeSwitchesForm
                index={index}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
                switchModels={switchModels}
              />
            </ProductFormItem>
          );
        })}
    </ProductFormGroup>
  );
}
