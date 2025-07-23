import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { object, string } from "yup";
import { useCallback } from "react";
import { update } from "immupdate";
import { SelectPickerField } from "../form/SelectPrickerField";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { noop } from "lodash";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly switchModels: SelectPickerOptionsProps[];
  readonly index: number;
}

const validationSchema = object({
  countOfPorts: string().required("Required!"),
});

export default function PoeSwitchesForm({
  initialValues,
  setInitialValues,
  switchModels,
  index,
}: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const switchPoe = [...initialValues?.switchPoe];

      switchPoe[index].model = event?.label;
      switchPoe[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          switchPoe,
        }),
      );
    },
    [setInitialValues, initialValues?.switchPoe],
  );

  const onChangeCountOfPorts = useCallback(
    (event: any) => {
      const switchPoe = [...initialValues?.switchPoe];

      switchPoe[index].countOfPorts = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          switchPoe,
        }),
      );
    },
    [setInitialValues, initialValues?.switchPoe],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const switchPoe = [...initialValues?.switchPoe];

      switchPoe[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          switchPoe,
        }),
      );
    },
    [setInitialValues, initialValues?.switchPoe],
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
                label="Modeli"
                options={switchModels}
                onChanges={onChangeModelId}
                value={{
                  label: initialValues?.switchPoe[index]?.model,
                  value: initialValues?.switchPoe[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="countOfPorts"
                label="Portlar soni"
                value={initialValues?.switchPoe[index]?.countOfPorts}
                onChange={onChangeCountOfPorts}
              />
            </div>

            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                value={initialValues?.switchPoe[index]?.info}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
