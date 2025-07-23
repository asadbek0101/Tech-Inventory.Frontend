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
  count: string().required("Required!"),
  info: string(),
});

export default function StanchionsForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const stanchion = [...initialValues?.stanchion];

      stanchion[index].stanchionType = event?.label;
      stanchion[index].stanchionTypeId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          stanchion,
        }),
      );
    },
    [setInitialValues, initialValues?.stanchion],
  );

  const onChangeCount = useCallback(
    (event: any) => {
      const stanchion = [...initialValues?.stanchion];

      stanchion[index].count = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          stanchion,
        }),
      );
    },
    [setInitialValues, initialValues?.stanchion],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const stanchion = [...initialValues?.stanchion];

      stanchion[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          stanchion,
        }),
      );
    },
    [setInitialValues, initialValues?.stanchion],
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
                name="stanchionTypeId"
                label="Turi"
                onChanges={onChangeModelId}
                options={models}
                value={{
                  label: initialValues?.stanchion[index]?.stanchionType,
                  value: initialValues?.stanchion[index]?.stanchionTypeId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="count"
                label="Soni"
                value={initialValues?.stanchion[index]?.count}
                onChange={onChangeCount}
              />
            </div>
            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumotlar"
                onChange={onChangeInfo}
                value={initialValues?.stanchion[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
