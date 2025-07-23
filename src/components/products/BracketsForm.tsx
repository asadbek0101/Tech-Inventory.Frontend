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

export default function BracketsForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const bracket = [...initialValues?.bracket];

      bracket[index].model = event?.label;
      bracket[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          bracket,
        }),
      );
    },
    [setInitialValues, initialValues?.bracket],
  );

  const onChangeCount = useCallback(
    (event: any) => {
      const bracket = [...initialValues?.bracket];

      bracket[index].count = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          bracket,
        }),
      );
    },
    [setInitialValues, initialValues?.bracket],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const bracket = [...initialValues?.bracket];

      bracket[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          bracket,
        }),
      );
    },
    [setInitialValues, initialValues?.bracket],
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
                  label: initialValues?.bracket[index]?.model,
                  value: initialValues?.bracket[index]?.modelId,
                }}
              />
            </div>

            <div className="col-3">
              <InputField
                name="count"
                label="Soni"
                onChange={onChangeCount}
                defaultValue={initialValues?.bracket[index]?.count}
              />
            </div>

            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.bracket[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
