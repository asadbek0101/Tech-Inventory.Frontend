import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { useCallback } from "react";
import { update } from "immupdate";
import { object, string } from "yup";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";

interface Props {
  readonly initialValues: any;
  readonly models: SelectPickerOptionsProps[];
  readonly setInitialValues: (value: any) => void;
  readonly index: number;
}

const validationSchema = object({
  power: string().required("Required!"),
});

export default function StabilizersForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const stabilizer = [...initialValues?.stabilizer];

      stabilizer[index].model = event?.label;
      stabilizer[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          stabilizer,
        }),
      );
    },
    [setInitialValues, initialValues?.stabilizer],
  );

  const onChangePower = useCallback(
    (event: any) => {
      const stabilizer = [...initialValues?.stabilizer];

      stabilizer[index].power = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          stabilizer,
        }),
      );
    },
    [setInitialValues, initialValues?.stabilizer],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const stabilizer = [...initialValues?.stabilizer];

      stabilizer[index].info = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          stabilizer,
        }),
      );
    },
    [setInitialValues, initialValues?.stabilizer],
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={noop}
      enableReinitialize={true}
      validationSchema={validationSchema}
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
                  label: initialValues?.stabilizer[index]?.model,
                  value: initialValues?.stabilizer[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="power"
                label="Quvvati"
                value={initialValues?.stabilizer[index]?.power}
                onChange={onChangePower}
              />
            </div>
            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                value={initialValues?.socket[index]?.info}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
