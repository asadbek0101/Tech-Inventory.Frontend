import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { object, string } from "yup";
import { useCallback } from "react";
import { update } from "immupdate";
import { ProductFormTypes } from "../../filters/ObjectFilter";
import { noop } from "lodash";

interface Props {
  readonly index: number;
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly formType?: ProductFormTypes;
}

const validationSchema = object({
  power: string(),
  count: string(),
  info: string(),
});

export default function AkumalatorsForm({ index, initialValues, setInitialValues }: Props) {
  const onChangePower = useCallback(
    (event: any) => {
      let akumalator = [...initialValues?.akumalator];

      akumalator[index].power = event.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          akumalator: akumalator,
        }),
      );
    },
    [setInitialValues, initialValues?.akumalator],
  );

  const onChangeCount = useCallback(
    (event: any) => {
      let akumalator = [...initialValues?.akumalator];

      akumalator[index].count = event.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          akumalator: akumalator,
        }),
      );
    },
    [setInitialValues, initialValues?.akumalator],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      let akumalator = [...initialValues?.akumalator];

      akumalator[index].info = event.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          akumalator: akumalator,
        }),
      );
    },
    [setInitialValues, initialValues?.akumalator],
  );

  return (
    <Formik
      initialValues={initialValues?.akumalator?.[index]}
      onSubmit={noop}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {() => (
        <Form>
          <div className="row">
            <div className="col-3">
              <InputField
                name="power"
                label="Quvvati"
                value={initialValues?.akumalator[index]?.power}
                onChange={onChangePower}
              />
            </div>
            <div className="col-3">
              <InputField
                name="count"
                label="Soni"
                value={initialValues?.akumalator[index]?.count}
                onChange={onChangeCount}
              />
            </div>
            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.akumalator[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
