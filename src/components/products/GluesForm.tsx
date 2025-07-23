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

export default function GluesForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeCount = useCallback(
    (event: any) => {
      const glueForNail = [...initialValues?.glueForNail];

      glueForNail[index].countOfCrate = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          glueForNail,
        }),
      );
    },
    [setInitialValues, initialValues?.glueForNail],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const glueForNail = [...initialValues?.glueForNail];

      glueForNail[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          glueForNail,
        }),
      );
    },
    [setInitialValues, initialValues?.glueForNail],
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
                name="countOfCrate"
                label="Soni"
                value={initialValues?.glueForNail[index]?.countOfCrate}
                onChange={onChangeCount}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.glueForNail[index]?.countOfCrate}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
