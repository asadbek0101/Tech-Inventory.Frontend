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

export default function SocketForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const socket = [...initialValues?.socket];

      socket[index].model = event?.label;
      socket[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          socket,
        }),
      );
    },
    [setInitialValues, initialValues?.socket],
  );

  const onChangeCount = useCallback(
    (event: any) => {
      const socket = [...initialValues?.socket];

      socket[index].count = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          socket,
        }),
      );
    },
    [setInitialValues, initialValues?.socket],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const socket = [...initialValues?.socket];

      socket[index].info = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          socket,
        }),
      );
    },
    [setInitialValues, initialValues?.socket],
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
                  label: initialValues?.socket[index]?.model,
                  value: initialValues?.socket[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="count"
                label="Rozetka soni"
                value={initialValues?.socket[index]?.count}
                onChange={onChangeCount}
              />
            </div>
            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumotlar"
                onChange={onChangeInfo}
                value={initialValues?.socket[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
