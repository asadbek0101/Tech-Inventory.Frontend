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
  count: string(),
  info: string(),
});

export default function AvtomatsForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeCount = useCallback(
    (event: any) => {
      let avtomat = [...initialValues?.avtomat];

      avtomat[index].count = event.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          avtomat,
        }),
      );
    },
    [setInitialValues, initialValues?.avtomat],
  );

  const onChangeModelId = useCallback(
    (event: any) => {
      let avtomat = [...initialValues?.avtomat];

      avtomat[index].modelId = event.value;
      avtomat[index].model = event.label;

      setInitialValues((prev: any) =>
        update(prev, {
          avtomat,
        }),
      );
    },
    [setInitialValues, initialValues?.avtomat],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      let avtomat = [...initialValues?.avtomat];

      avtomat[index].info = event.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          avtomat,
        }),
      );
    },
    [setInitialValues, initialValues?.avtomat],
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
                  label: initialValues?.avtomat[index]?.model,
                  value: initialValues?.avtomat[index]?.modelId,
                }}
              />
            </div>

            <div className="col-3">
              <InputField
                name="count"
                label="Soni"
                value={initialValues?.avtomat[index]?.count}
                onChange={onChangeCount}
              />
            </div>

            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.avtomat[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
