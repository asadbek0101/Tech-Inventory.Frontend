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

export default function CameraForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeIp = useCallback(
    (event: any) => {
      const camera = [...initialValues?.camera];

      camera[index].ip = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          camera,
        }),
      );
    },
    [setInitialValues, initialValues?.camera],
  );

  const onChangeSerialNumber = useCallback(
    (event: any) => {
      const camera = [...initialValues?.camera];

      camera[index].serialNumber = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          camera,
        }),
      );
    },
    [setInitialValues, initialValues?.camera],
  );

  const onChangeModelId = useCallback(
    (event: any) => {
      const camera = [...initialValues?.camera];

      camera[index].model = event?.label;
      camera[index].modelId = event?.value;
      setInitialValues((prev: any) =>
        update(prev, {
          camera,
        }),
      );
    },
    [setInitialValues, initialValues?.camera],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const camera = [...initialValues?.camera];

      camera[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          camera,
        }),
      );
    },
    [setInitialValues, initialValues?.camera],
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
                  label: initialValues?.camera[index]?.model,
                  value: initialValues?.camera[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="serialNumber"
                label="Serial Nomeri"
                value={initialValues?.camera[index]?.serialNumber}
                onChange={onChangeSerialNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="ip"
                label="Ip"
                value={initialValues?.camera[index]?.ip}
                onChange={onChangeIp}
              />
            </div>
            <div className="col-3">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                value={initialValues?.camera[index]?.info}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
