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
  serialNumber: string().required("Required!"),
  number: string().required("Required!"),
  info: string(),
});

export default function DShelvesForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeBrandId = useCallback(
    (event: any) => {
      const distributionShelf = [...initialValues?.distributionShelf];

      distributionShelf[index].brand = event?.label;
      distributionShelf[index].brandId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          distributionShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.distributionShelf],
  );

  const onChangeNumber = useCallback(
    (event: any) => {
      const distributionShelf = [...initialValues?.distributionShelf];

      distributionShelf[index].number = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          distributionShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.distributionShelf],
  );

  const onChangeSerialNumber = useCallback(
    (event: any) => {
      const distributionShelf = [...initialValues?.distributionShelf];

      distributionShelf[index].serialNumber = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          distributionShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.distributionShelf],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const distributionShelf = [...initialValues?.distributionShelf];

      distributionShelf[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          distributionShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.distributionShelf],
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
                name="brandId"
                label="Markasi"
                onChanges={onChangeBrandId}
                options={models}
                value={{
                  label: initialValues?.distributionShelf[index]?.brand,
                  value: initialValues?.distributionShelf[index]?.brandId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="serialNumber"
                label="Seriasi"
                value={initialValues?.distributionShelf[index]?.serialNumber}
                onChange={onChangeSerialNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="digitNumber"
                label="Raqami"
                value={initialValues?.distributionShelf[index]?.number}
                onChange={onChangeNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.distributionShelf[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
