import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { object, string } from "yup";
import { useCallback } from "react";
import { update } from "immupdate";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";

interface Props {
  readonly initialValues: any;
  readonly models: SelectPickerOptionsProps[];
  readonly setInitialValues: (value: any) => void;
  readonly index: number;
}

const validationSchema = object({
  status: string(),
  serialNumber: string().required("Required!"),
  ip: string().required("Required!"),
  info: string(),
});

export default function CameraC733Form({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeIp = useCallback(
    (event: any) => {
      const c733Camera = [...initialValues?.c733Camera];

      c733Camera[index].ip = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          c733Camera,
        }),
      );
    },
    [setInitialValues, initialValues?.c733Camera],
  );

  const onChangeSerialNumber = useCallback(
    (event: any) => {
      const c733Camera = [...initialValues?.c733Camera];

      c733Camera[index].serialNumber = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          c733Camera,
        }),
      );
    },
    [setInitialValues, initialValues?.c733Camera],
  );

  const onChangeModelId = useCallback(
    (event: any) => {
      const c733Camera = [...initialValues?.c733Camera];

      c733Camera[index].model = event?.label;
      c733Camera[index].modelId = event?.value;
      setInitialValues((prev: any) =>
        update(prev, {
          c733Camera,
        }),
      );
    },
    [setInitialValues, initialValues?.c733Camera],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const c733Camera = [...initialValues?.c733Camera];

      c733Camera[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          c733Camera,
        }),
      );
    },
    [setInitialValues, initialValues?.c733Camera],
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
              <SelectPickerField
                name="modelId"
                label="Model"
                options={models}
                onChanges={onChangeModelId}
                value={{
                  label: initialValues?.c733Camera[index]?.model,
                  value: initialValues?.c733Camera[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="serialNumber"
                label="Serial Nomeri"
                value={initialValues?.c733Camera[index]?.serialNumber}
                onChange={onChangeSerialNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="ip"
                label="Ip"
                value={initialValues?.c733Camera[index]?.ip}
                onChange={onChangeIp}
              />
            </div>
            <div className="col-3">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                value={initialValues?.c733Camera[index]?.info}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
