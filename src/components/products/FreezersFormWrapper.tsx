import { useCallback } from "react";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import FreezersForm from "./FreezersForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function FreezersFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const onChangeProduct = useCallback(
    (index: number, type: "add" | "delete") => {
      const oldProduct = [...initialValues?.freezer];

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
          freezer: oldProduct,
        }),
      );
    },
    [initialValues?.freezer],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.freezer &&
        initialValues?.freezer?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <FreezersForm
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
