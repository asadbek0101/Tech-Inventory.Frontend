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
  readonly setInitialValues: (value: any) => void;
  readonly models: SelectPickerOptionsProps[];
  readonly index: number;
}

const validationSchema = object({
  info: string(),
});

export default function VideoRecordersForm({
  initialValues,
  setInitialValues,
  models,
  index,
}: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const videoRecorder = [...initialValues?.videoRecorder];

      videoRecorder[index].model = event?.label;
      videoRecorder[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          videoRecorder,
        }),
      );
    },
    [setInitialValues, initialValues?.videoRecorder],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const videoRecorder = [...initialValues?.videoRecorder];

      videoRecorder[index].info = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          videoRecorder,
        }),
      );
    },
    [setInitialValues, initialValues?.videoRecorder],
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
                onChanges={onChangeModelId}
                options={models}
                value={{
                  label: initialValues?.videoRecorder[index]?.model,
                  value: initialValues?.videoRecorder[index]?.modelId,
                }}
              />
            </div>

            <div className="col-9">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumotlar"
                onChange={onChangeInfo}
                value={initialValues?.videoRecorder[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
