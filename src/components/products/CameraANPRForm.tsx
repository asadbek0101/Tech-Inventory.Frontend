import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { object, string } from "yup";
import { useCallback } from "react";
import { update } from "immupdate";
import { ProductFormTypes } from "../../filters/ObjectFilter";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";

interface Props {
  readonly initialValues: any;
  readonly models: SelectPickerOptionsProps[];
  readonly setInitialValues: (value: any) => void;
  readonly formType?: ProductFormTypes;
  readonly index: number;
}

const validationSchema = object({
  status: string(),
  serialNumber: string().required("Required!"),
  ip: string().required("Required!"),
  info: string(),
});

export default function CameraANPRForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeIp = useCallback(
    (event: any) => {
      const anprCamera = [...initialValues?.anprCamera];

      anprCamera[index].ip = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          anprCamera,
        }),
      );
    },
    [setInitialValues, initialValues?.anprCamera],
  );

  const onChangeSerialNumber = useCallback(
    (event: any) => {
      const anprCamera = [...initialValues?.anprCamera];

      anprCamera[index].serialNumber = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          anprCamera,
        }),
      );
    },
    [setInitialValues, initialValues?.anprCamera],
  );

  const onChangeModelId = useCallback(
    (event: any) => {
      const anprCamera = [...initialValues?.anprCamera];

      anprCamera[index].model = event?.label;
      anprCamera[index].modelId = event?.value;
      setInitialValues((prev: any) =>
        update(prev, {
          anprCamera,
        }),
      );
    },
    [setInitialValues, initialValues?.anprCamera],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const anprCamera = [...initialValues?.anprCamera];

      anprCamera[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          anprCamera,
        }),
      );
    },
    [setInitialValues, initialValues?.anprCamera],
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
                  label: initialValues?.anprCamera[index]?.model,
                  value: initialValues?.anprCamera[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="serialNumber"
                label="Serial Nomeri"
                value={initialValues?.anprCamera[index]?.serialNumber}
                onChange={onChangeSerialNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="ip"
                label="Ip"
                value={initialValues?.anprCamera[index]?.ip}
                onChange={onChangeIp}
              />
            </div>
            <div className="col-3">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                value={initialValues?.anprCamera[index]?.info}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
