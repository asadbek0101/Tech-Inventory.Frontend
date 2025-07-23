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

export default function BoxesForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeMeter = useCallback(
    (event: any) => {
      const box = [...initialValues?.box];

      box[index].meter = event?.target.value;

      setInitialValues((prev: any) =>
        update(prev, {
          box,
        }),
      );
    },
    [setInitialValues, initialValues?.box],
  );

  const onChangeTypeId = useCallback(
    (event: any) => {
      const box = [...initialValues?.box];

      box[index].type = event?.type;
      box[index].typeId = event?.typeId;

      setInitialValues((prev: any) =>
        update(prev, {
          box,
        }),
      );
    },
    [setInitialValues, initialValues?.box],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const box = [...initialValues?.box];

      box[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          box,
        }),
      );
    },
    [setInitialValues, initialValues?.box],
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
                name="typeId"
                label="Turi"
                onChanges={onChangeTypeId}
                options={models}
                value={{
                  label: initialValues?.box[index]?.type,
                  value: initialValues?.box[index]?.typeId,
                }}
              />
            </div>

            <div className="col-3">
              <InputField
                name="meter"
                label="Uzunligi"
                value={initialValues?.box[index]?.meter}
                onChange={onChangeMeter}
              />
            </div>

            <div className="col-6">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.box[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
