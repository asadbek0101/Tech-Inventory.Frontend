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
  readonly models?: SelectPickerOptionsProps[];
  readonly index: number;
}

const validationSchema = object({
  info: string(),
  meter: string().required("Required!"),
});

export default function UtpCabelForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const utpCabel = [...initialValues?.utpCabel];

      utpCabel[index].model = event?.label;
      utpCabel[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          utpCabel,
        }),
      );
    },
    [setInitialValues, initialValues?.utpCabel],
  );

  const onChangeMeter = useCallback(
    (event: any) => {
      const utpCabel = [...initialValues?.utpCabel];

      utpCabel[index].meter = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          utpCabel,
        }),
      );
    },
    [setInitialValues, initialValues?.utpCabel],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const utpCabel = [...initialValues?.utpCabel];

      utpCabel[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          utpCabel,
        }),
      );
    },
    [setInitialValues, initialValues?.utpCabel],
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
                  label: initialValues?.utpCabel[index]?.model,
                  value: initialValues?.utpCabel[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="meter"
                label="Metri"
                value={initialValues?.utpCabel[index]?.meter}
                onChange={onChangeMeter}
              />
            </div>
            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.utpCabel[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
