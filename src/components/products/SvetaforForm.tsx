import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { object, string } from "yup";
import { useCallback } from "react";
import { update } from "immupdate";
import { SelectPickerField } from "../form/SelectPrickerField";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { noop } from "lodash";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly models: SelectPickerOptionsProps[];
  readonly index: number;
}

const validationSchema = object({
  countOfPorts: string().required("Required!"),
  info: string(),
});

export default function SvetaforForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeCountOfPorts = useCallback(
    (event: any) => {
      const svetaforDetektor = [...initialValues?.svetaforDetektor];

      svetaforDetektor[index].countOfPorts = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          svetaforDetektor,
        }),
      );
    },
    [setInitialValues, initialValues?.svetaforDetektor],
  );

  const onChangeModelId = useCallback(
    (event: any) => {
      const svetaforDetektor = [...initialValues?.svetaforDetektor];

      svetaforDetektor[index].model = event?.label;
      svetaforDetektor[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          svetaforDetektor,
        }),
      );
    },
    [setInitialValues, initialValues?.svetaforDetektor],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const svetaforDetektor = [...initialValues?.svetaforDetektor];

      svetaforDetektor[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          svetaforDetektor,
        }),
      );
    },
    [setInitialValues, initialValues?.svetaforDetektor],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={noop}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {() => (
        <Form>
          <div className="row">
            <div className="col-3">
              <SelectPickerField
                name="modelId"
                label="Modeli"
                options={models}
                onChanges={onChangeModelId}
                value={{
                  label: initialValues?.svetaforDetektor[index]?.model,
                  value: initialValues?.svetaforDetektor[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="countOfPorts"
                label="Portlar soni"
                value={initialValues?.svetaforDetektor[index]?.countOfPorts}
                onChange={onChangeCountOfPorts}
              />
            </div>

            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                defaultValue={initialValues?.svetaforDetektor[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
