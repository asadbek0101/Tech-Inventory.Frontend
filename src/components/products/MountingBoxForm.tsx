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
  readonly index: any;
}

const validationSchema = object({
  info: string(),
});

export default function MountingBoxForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeCount = useCallback(
    (event: any) => {
      const mountingBox = [...initialValues?.mountingBox];

      mountingBox[index].count = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          mountingBox,
        }),
      );
    },
    [setInitialValues, initialValues?.mountingBox],
  );

  const onChangeModelId = useCallback(
    (event: any) => {
      const mountingBox = [...initialValues?.mountingBox];

      mountingBox[index].model = event?.label;
      mountingBox[index].modelId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          mountingBox,
        }),
      );
    },
    [setInitialValues, initialValues?.mountingBox],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const mountingBox = [...initialValues?.mountingBox];

      mountingBox[index].info = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          mountingBox,
        }),
      );
    },
    [setInitialValues, initialValues?.mountingBox],
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
                  label: initialValues?.mountingBox[index]?.model,
                  value: initialValues?.mountingBox[index]?.modelId,
                }}
              />
            </div>

            <div className="col-3">
              <InputField
                name="count"
                label="Soni"
                value={initialValues?.mountingBox[index]?.count}
                onChange={onChangeCount}
              />
            </div>

            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.mountingBox[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
