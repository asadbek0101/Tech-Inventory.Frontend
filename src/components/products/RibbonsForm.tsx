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

export default function RibbonsForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeMeter = useCallback(
    (event: any) => {
      const ribbon = [...initialValues?.ribbon];

      ribbon[index].meter = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          ribbon,
        }),
      );
    },
    [setInitialValues, initialValues?.ribbon],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const ribbon = [...initialValues?.ribbon];

      ribbon[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          ribbon,
        }),
      );
    },
    [setInitialValues, initialValues?.ribbon],
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
                name="meter"
                label="Uzunligi"
                value={initialValues?.ribbon[index]?.meter}
                onChange={onChangeMeter}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.ribbon[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
