import { useCallback, useEffect, useState } from "react";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import ComboSwitchesForm from "./ComboSwitchesForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function ComboSwitchesFormWrapper({
  initialValues,
  setInitialValues,
  title,
}: Props) {
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
      const oldProduct = [...initialValues?.switchKombo];

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
          switchKombo: oldProduct,
        }),
      );
    },
    [initialValues?.switchKombo],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.switchKombo &&
        initialValues?.switchKombo?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <ComboSwitchesForm
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
