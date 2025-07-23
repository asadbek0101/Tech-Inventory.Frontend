import { useCallback, useEffect, useState } from "react";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";
import { ModelTypes } from "../../api/models/ModelsDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import UtpCabelForm from "./UtpCabelForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly title: string;
}

export default function UtpCabelFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { ModelsApi } = useModelsApiContext();

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Cabel })
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
      const oldCabel = [...initialValues?.utpCabel];

      if (type === "add") {
        oldCabel.push({
          modelId: 0,
          meter: "",
          info: "",
        });
      }

      if (type === "delete") {
        oldCabel.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          utpCabel: oldCabel,
        }),
      );
    },
    [initialValues?.utpCabel],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.utpCabel &&
        initialValues?.utpCabel?.map((_: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <UtpCabelForm
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
