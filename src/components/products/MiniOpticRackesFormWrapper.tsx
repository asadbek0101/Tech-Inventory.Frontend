import { useCallback } from "react";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import MiniOpticRackesForm from "./MiniOpticRackesForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function MiniOpticRackesFormWrapper({
  initialValues,
  setInitialValues,
  title,
}: Props) {
  const onChangeProduct = useCallback(
    (index: number, type: "add" | "delete") => {
      const oldProduct = [...initialValues?.miniOptikRack];

      if (type === "add") {
        oldProduct.push({
          numberOfFibers: "",
          countOfPorts: "",
          typeOfAdapter: "",
          info: "",
        });
      }

      if (type === "delete") {
        oldProduct.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          miniOptikRack: oldProduct,
        }),
      );
    },
    [initialValues?.miniOptikRack],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.miniOptikRack &&
        initialValues?.miniOptikRack?.map((_: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <MiniOpticRackesForm
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
