import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { object, string } from "yup";
import { useCallback } from "react";
import { update } from "immupdate";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly models: SelectPickerOptionsProps[];
  readonly index: number;
}

const validationSchema = object({
  info: string(),
});

export default function CountersForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const counter = [...initialValues?.counter];
      counter[index].model = event.label;
      counter[index].modelId = event.value;
      setInitialValues((prev: any) =>
        update(prev, {
          counter,
        }),
      );
    },
    [setInitialValues, initialValues?.counter],
  );

  const onChangeNumberOfConcern = useCallback(
    (event: any) => {
      const counter = [...initialValues?.counter];
      counter[index].numberOfConcern = event?.target?.value;
      setInitialValues((prev: any) =>
        update(prev, {
          counter,
        }),
      );
    },
    [setInitialValues, initialValues?.counter],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const counter = [...initialValues?.counter];
      counter[index].info = event?.target?.value;
      setInitialValues((prev: any) =>
        update(prev, {
          counter,
        }),
      );
    },
    [setInitialValues, initialValues?.counter],
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
                onChanges={onChangeModelId}
                options={models}
                value={{
                  label: initialValues?.counter[index]?.model,
                  value: initialValues?.counter[index]?.value,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="numberOfConcern"
                label="Korxona raqami"
                onChange={onChangeNumberOfConcern}
                value={initialValues?.counter[index]?.numberOfConcern}
              />
            </div>
            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.counter[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
