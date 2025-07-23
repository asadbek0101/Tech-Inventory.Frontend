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

export default function ComboSwitchesForm({
  initialValues,
  setInitialValues,
  switchModels,
  index,
}: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const switchKombo = [...initialValues?.switchKombo];

      switchKombo[index].model = event?.label;
      switchKombo[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          switchKombo,
        }),
      );
    },
    [setInitialValues, initialValues?.switchKombo],
  );

  const onChangeCountOfPorts = useCallback(
    (event: any) => {
      const switchKombo = [...initialValues?.switchKombo];

      switchKombo[index].countOfPorts = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          switchKombo,
        }),
      );
    },
    [setInitialValues, initialValues?.switchKombo],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const switchKombo = [...initialValues?.switchKombo];

      switchKombo[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          switchKombo,
        }),
      );
    },
    [setInitialValues, initialValues?.switchKombo],
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
                  label: initialValues?.switchKombo[index]?.model,
                  value: initialValues?.switchKombo[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="countOfPorts"
                label="Portlar soni"
                value={initialValues?.switchKombo[index]?.countOfPorts}
                onChange={onChangeCountOfPorts}
              />
            </div>

            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                value={initialValues?.switchKombo[index]?.info}
                onChange={onChangeInfo}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
