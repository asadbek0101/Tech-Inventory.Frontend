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
  info: string(),
});

export default function TerminalServersForm({
  initialValues,
  setInitialValues,
  models,
  index,
}: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const terminalServer = [...initialValues?.terminalServer];

      terminalServer[index].model = event?.label;
      terminalServer[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          terminalServer,
        }),
      );
    },
    [setInitialValues, initialValues?.terminalServer],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const terminalServer = [...initialValues?.terminalServer];

      terminalServer[index].info = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          terminalServer,
        }),
      );
    },
    [setInitialValues, initialValues?.terminalServer],
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
                options={models}
                label="Modeli"
                onChanges={onChangeModelId}
                value={{
                  label: initialValues?.terminalServer[index]?.model,
                  value: initialValues?.terminalServer[index]?.modelId,
                }}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.terminalServer[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
