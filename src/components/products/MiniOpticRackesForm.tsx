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
  numberOfFibers: string().required("Required!"),
  typeOfAdapter: string().required("Required!"),
  countOfPorts: string().required("Required!"),
  info: string(),
});

export default function MiniOpticRackesForm({ initialValues, setInitialValues, index }: Props) {
  const onChangeNumberOfFibers = useCallback(
    (event: any) => {
      const miniOptikRack = [...initialValues?.miniOptikRack];

      miniOptikRack[index].numberOfFibers = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          miniOptikRack,
        }),
      );
    },
    [setInitialValues, initialValues?.miniOptikRack],
  );

  const onChangeTypeOfAdapter = useCallback(
    (event: any) => {
      const miniOptikRack = [...initialValues?.miniOptikRack];

      miniOptikRack[index].typeOfAdapter = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          miniOptikRack,
        }),
      );
    },
    [setInitialValues, initialValues?.miniOptikRack],
  );

  const onChangeCountOfPorts = useCallback(
    (event: any) => {
      const miniOptikRack = [...initialValues?.miniOptikRack];

      miniOptikRack[index].countOfPorts = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          miniOptikRack,
        }),
      );
    },
    [setInitialValues, initialValues?.miniOptikRack],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const miniOptikRack = [...initialValues?.miniOptikRack];

      miniOptikRack[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          miniOptikRack,
        }),
      );
    },
    [setInitialValues, initialValues?.miniOptikRack],
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
                name="numberOfFibers"
                label="Tolalar soni"
                value={initialValues?.miniOptikRack[index]?.numberOfFibers}
                onChange={onChangeNumberOfFibers}
              />
            </div>
            <div className="col-3">
              <InputField
                name="typeOfAdapter"
                label="Adapter turi"
                value={initialValues?.miniOptikRack[index]?.typeOfAdapter}
                onChange={onChangeTypeOfAdapter}
              />
            </div>
            <div className="col-3">
              <InputField
                name="countOfPorts"
                label="Portlar soni"
                value={initialValues?.miniOptikRack[index]?.countOfPorts}
                onChange={onChangeCountOfPorts}
              />
            </div>
            <div className="col-3">
              <InputField
                name="info"
                label="Qo'shimcha malumot"
                value={initialValues?.miniOptikRack[index]?.info}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
