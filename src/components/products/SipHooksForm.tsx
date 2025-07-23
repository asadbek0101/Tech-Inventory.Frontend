import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { object, string } from "yup";
import { useCallback } from "react";
import { update } from "immupdate";
import { noop } from "lodash";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly index: number;
}

const validationSchema = object({
  info: string(),
});

export default function SipHooksForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeCount = useCallback(
    (event: any) => {
      const sipHook = [...initialValues?.sipHook];

      sipHook[index].count = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          sipHook,
        }),
      );
    },
    [setInitialValues, initialValues?.sipHook],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const sipHook = [...initialValues?.sipHook];

      sipHook[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          sipHook,
        }),
      );
    },
    [setInitialValues, initialValues?.sipHook],
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
              <InputField
                name="count"
                label="Soni"
                value={initialValues?.sipHook[index]?.count}
                onChange={onChangeCount}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumotlar"
                onChange={onChangeInfo}
                value={initialValues?.sipHook[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
