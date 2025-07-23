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
  readonly models: SelectPickerOptionsProps[];
  readonly setInitialValues: (value: any) => void;
  readonly index: number;
}

const validationSchema = object({
  count: string().required("Required!"),
  info: string(),
});

export default function ProjectorForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeModelId = useCallback(
    (event: any) => {
      const projector = [...initialValues?.projector];

      projector[index].model = event?.label;
      projector[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          projector,
        }),
      );
    },
    [setInitialValues, initialValues?.projector],
  );

  const onChangeCount = useCallback(
    (event: any) => {
      const projector = [...initialValues?.projector];

      projector[index].count = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          projector,
        }),
      );
    },
    [setInitialValues, initialValues?.projector],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const projector = [...initialValues?.projector];

      projector[index].info = event?.target?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          projector,
        }),
      );
    },
    [setInitialValues, initialValues?.projector],
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
                options={models}
                onChanges={onChangeModelId}
                value={{
                  label: initialValues?.projector[index]?.model,
                  value: initialValues?.projector[index]?.modelId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="count"
                label="Soni"
                value={initialValues?.projector[index]?.count}
                onChange={onChangeCount}
              />
            </div>
            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.projector[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
