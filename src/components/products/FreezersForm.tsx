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

export default function FreezersForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeCount = useCallback(
    (event: any) => {
      const freezer = [...initialValues?.freezer];

      freezer[index].count = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          freezer,
        }),
      );
    },
    [setInitialValues, initialValues?.freezer],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const freezer = [...initialValues?.freezer];

      freezer[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          freezer,
        }),
      );
    },
    [setInitialValues, initialValues?.freezer],
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
                value={initialValues?.freezer[index]?.count}
                onChange={onChangeCount}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.freezer[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
