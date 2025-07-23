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
  power: string().required("Required!"),
  info: string(),
});

export default function UpsForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangePower = useCallback(
    (event: any) => {
      const ups = [...initialValues?.ups];

      ups[index].power = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          ups,
        }),
      );
    },
    [setInitialValues, initialValues?.ups],
  );

  const onChangeModelId = useCallback(
    (event: any) => {
      const ups = [...initialValues?.ups];

      ups[index].model = event?.label;
      ups[index].modelId = event?.value;
      setInitialValues((prev: any) =>
        update(prev, {
          ups,
        }),
      );
    },
    [setInitialValues, initialValues?.ups],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const ups = [...initialValues?.ups];

      ups[index].info = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          ups,
        }),
      );
    },
    [setInitialValues, initialValues?.ups],
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
                  label: initialValues?.ups[index]?.model,
                  value: initialValues?.ups[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="power"
                label="Quvvati"
                value={initialValues?.ups[index]?.power}
                onChange={onChangePower}
              />
            </div>

            <div className="col-6">
              <InputField
                name="info"
                label="Info"
                onChange={onChangeInfo}
                value={initialValues?.ups[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
