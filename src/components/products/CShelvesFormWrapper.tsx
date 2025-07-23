import { useCallback, useEffect, useState } from "react";
import { update } from "immupdate";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { ModelTypes } from "../../api/models/ModelsDto";
import { showError } from "../../utils/NotificationUtils";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import CShelvesForm from "./CShelvesForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function CShelvesFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);
  const { ModelsApi } = useModelsApiContext();

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

  const onChangeProduct = useCallback(
    (index: number, type: "add" | "delete") => {
      const oldProduct = [...initialValues?.centralTelecomunicationShelf];

      if (type === "add") {
        oldProduct.push({
          brandId: 0,
          number: "",
          info: "",
          serialNumber: "",
        });
      }

      if (type === "delete") {
        oldProduct.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          centralTelecomunicationShelf: oldProduct,
        }),
      );
    },
    [initialValues?.centralTelecomunicationShelf],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.centralTelecomunicationShelf &&
        initialValues?.centralTelecomunicationShelf?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <CShelvesForm
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
