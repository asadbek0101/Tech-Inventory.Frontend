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

export default function NailsForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeWeight = useCallback(
    (event: any) => {
      const nail = [...initialValues?.nail];

      nail[index].weight = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          nail,
        }),
      );
    },
    [setInitialValues, initialValues?.nail],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const nail = [...initialValues?.nail];

      nail[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          nail,
        }),
      );
    },
    [setInitialValues, initialValues?.nail],
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
                name="weight"
                label="Og'irligi"
                value={initialValues?.nail[index]?.weight}
                onChange={onChangeWeight}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.nail[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
