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

export default function GofraShellsForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeMeter = useCallback(
    (event: any) => {
      const gofraShell = [...initialValues?.gofraShell];

      gofraShell[index].meter = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          gofraShell,
        }),
      );
    },
    [setInitialValues, initialValues?.gofraShell],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const gofraShell = [...initialValues?.gofraShell];

      gofraShell[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          gofraShell,
        }),
      );
    },
    [setInitialValues, initialValues?.gofraShell],
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
                value={initialValues?.gofraShell[index]?.meter}
                onChange={onChangeMeter}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                defaultValue={initialValues?.gofraShell[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
