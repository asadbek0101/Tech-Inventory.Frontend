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

export default function ServersForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeIp = useCallback(
    (event: any) => {
      const server = [...initialValues?.server];

      server[index].ip = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          server,
        }),
      );
    },
    [setInitialValues, initialValues?.server],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const server = [...initialValues?.server];

      server[index].info = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          server,
        }),
      );
    },
    [setInitialValues, initialValues?.server],
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
                name="ip"
                label="Ip"
                value={initialValues?.server[index]?.ip}
                onChange={onChangeIp}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.server[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
