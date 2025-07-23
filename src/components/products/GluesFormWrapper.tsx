import { useCallback } from "react";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import GluesForm from "./GluesForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function GluesFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const onChangeProduct = useCallback(
    (index: number, type: "add" | "delete") => {
      const oldProduct = [...initialValues?.glueForNail];

      if (type === "add") {
        oldProduct.push({
          countOfCrate: "",
          info: "",
        });
      }

      if (type === "delete") {
        oldProduct.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          glueForNail: oldProduct,
        }),
      );
    },
    [initialValues?.glueForNail],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.glueForNail &&
        initialValues?.glueForNail?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <GluesForm
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
