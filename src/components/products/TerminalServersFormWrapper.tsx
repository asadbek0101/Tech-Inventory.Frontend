import { useCallback, useEffect, useState } from "react";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import TerminalServersForm from "./TerminalServersForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function TerminalServersFormWrapper({
  initialValues,
  setInitialValues,
  title,
}: Props) {
  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { ModelsApi } = useModelsApiContext();

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.TerminalServer })
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
      const oldProduct = [...initialValues?.terminalServer];

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
          terminalServer: oldProduct,
        }),
      );
    },
    [initialValues?.terminalServer],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.terminalServer &&
        initialValues?.terminalServer?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <TerminalServersForm
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
