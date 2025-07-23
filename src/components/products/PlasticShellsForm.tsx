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

export default function PlasticShellsForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeMeter = useCallback(
    (event: any) => {
      const plasticShell = [...initialValues?.plasticShell];

      plasticShell[index].meter = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          plasticShell,
        }),
      );
    },
    [setInitialValues, initialValues?.plasticShell],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const plasticShell = [...initialValues?.plasticShell];

      plasticShell[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          plasticShell,
        }),
      );
    },
    [setInitialValues, initialValues?.plasticShell],
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
                label="Uzunligi(m)"
                value={initialValues?.plasticShell[index]?.meter}
                onChange={onChangeMeter}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                defaultValue={initialValues?.plasticShell[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
