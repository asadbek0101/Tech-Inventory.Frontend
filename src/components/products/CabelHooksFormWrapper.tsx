import { useCallback } from "react";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import CabelHooksForm from "./CabelHooksForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function CabelHooksFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const onChangeProduct = useCallback(
    (index: number, type: "add" | "delete") => {
      const oldProduct = [...initialValues?.cabelHook];

      if (type === "add") {
        oldProduct.push({
          count: "",
          info: "",
        });
      }

      if (type === "delete") {
        oldProduct.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          cabelHook: oldProduct,
        }),
      );
    },
    [initialValues?.cabelHook],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.cabelHook &&
        initialValues?.cabelHook?.map((_: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <CabelHooksForm
                index={index}
                initialValues={initialValues}
                setInitialValues={setInitialValues}
              />
            </ProductFormItem>
          );
        })}
    </ProductFormGroup>
  );
}
