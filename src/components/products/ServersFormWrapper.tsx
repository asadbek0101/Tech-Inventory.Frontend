import { useCallback } from "react";
import { update } from "immupdate";

import ProductFormGroup from "../ui/ProductFormGroup";
import ProductFormItem from "../ui/ProductFormItem";
import ServersForm from "./ServersForm";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;

  readonly title: string;
}

export default function ServersFormWrapper({ initialValues, setInitialValues, title }: Props) {
  const onChangeProduct = useCallback(
    (index: number, type: "add" | "delete") => {
      const oldProduct = [...initialValues?.server];

      if (type === "add") {
        oldProduct.push({
          ip: "",
          info: "",
        });
      }

      if (type === "delete") {
        oldProduct.splice(index, 1);
      }

      setInitialValues((prev: any) =>
        update(prev, {
          server: oldProduct,
        }),
      );
    },
    [initialValues?.avtomat],
  );

  return (
    <ProductFormGroup title={title} addClick={() => onChangeProduct(0, "add")}>
      {initialValues?.server &&
        initialValues?.server?.map((item: any, index: number) => {
          return (
            <ProductFormItem
              key={index}
              index={index}
              deleteClick={() => onChangeProduct(index, "delete")}
            >
              <ServersForm
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
