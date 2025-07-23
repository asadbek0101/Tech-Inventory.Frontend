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

export default function ElectrCabelForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const electrCabel = [...initialValues?.electrCabel];

      electrCabel[index].model = event?.label;
      electrCabel[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          electrCabel,
        }),
      );
    },
    [setInitialValues, initialValues?.electrCabel],
  );

  const onChangeMeter = useCallback(
    (event: any) => {
      const electrCabel = [...initialValues?.electrCabel];

      electrCabel[index].meter = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          electrCabel,
        }),
      );
    },
    [setInitialValues, initialValues?.electrCabel],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const electrCabel = [...initialValues?.electrCabel];

      electrCabel[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          electrCabel,
        }),
      );
    },
    [setInitialValues, initialValues?.electrCabel],
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
                  label: initialValues?.electrCabel[index]?.model,
                  value: initialValues?.electrCabel[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="meter"
                label="Metri"
                value={initialValues?.electrCabel[index]?.meter}
                onChange={onChangeMeter}
              />
            </div>
            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.electrCabel[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
