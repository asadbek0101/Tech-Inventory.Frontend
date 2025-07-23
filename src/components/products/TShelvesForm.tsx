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

export default function TShelvesForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeBrandId = useCallback(
    (event: any) => {
      const telecomunicationShelf = [...initialValues?.telecomunicationShelf];

      telecomunicationShelf[index].brand = event?.label;
      telecomunicationShelf[index].brandId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          telecomunicationShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.telecomunicationShelf],
  );

  const onChangeNumber = useCallback(
    (event: any) => {
      const telecomunicationShelf = [...initialValues?.telecomunicationShelf];

      telecomunicationShelf[index].number = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          telecomunicationShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.telecomunicationShelf],
  );

  const onChangeSerialNumber = useCallback(
    (event: any) => {
      const telecomunicationShelf = [...initialValues?.telecomunicationShelf];

      telecomunicationShelf[index].serialNumber = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          telecomunicationShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.telecomunicationShelf],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const telecomunicationShelf = [...initialValues?.telecomunicationShelf];

      telecomunicationShelf[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          telecomunicationShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.telecomunicationShelf],
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
                  label: initialValues?.telecomunicationShelf[index]?.brand,
                  value: initialValues?.telecomunicationShelf[index]?.brandId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="serialNumber"
                label="Seriasi"
                value={initialValues?.telecomunicationShelf[index]?.serialNumber}
                onChange={onChangeSerialNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="digitNumber"
                label="Raqami"
                value={initialValues?.telecomunicationShelf[index]?.number}
                onChange={onChangeNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.telecomunicationShelf[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
