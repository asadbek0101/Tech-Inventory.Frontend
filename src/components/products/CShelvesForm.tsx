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

export default function CShelvesForm({ initialValues, setInitialValues, models, index }: Props) {
  const onChangeBrandId = useCallback(
    (event: any) => {
      const centralTelecomunicationShelf = [...initialValues?.centralTelecomunicationShelf];

      centralTelecomunicationShelf[index].brand = event?.label;
      centralTelecomunicationShelf[index].brandId = event?.value;

      setInitialValues((prev: any) =>
        update(prev, {
          centralTelecomunicationShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.centralTelecomunicationShelf],
  );

  const onChangeNumber = useCallback(
    (event: any) => {
      const centralTelecomunicationShelf = [...initialValues?.centralTelecomunicationShelf];

      centralTelecomunicationShelf[index].number = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          centralTelecomunicationShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.centralTelecomunicationShelf],
  );

  const onChangeSerialNumber = useCallback(
    (event: any) => {
      const centralTelecomunicationShelf = [...initialValues?.centralTelecomunicationShelf];

      centralTelecomunicationShelf[index].serialNumber = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          centralTelecomunicationShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.centralTelecomunicationShelf],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      const centralTelecomunicationShelf = [...initialValues?.centralTelecomunicationShelf];

      centralTelecomunicationShelf[index].info = event?.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          centralTelecomunicationShelf,
        }),
      );
    },
    [setInitialValues, initialValues?.centralTelecomunicationShelf],
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
                  label: initialValues?.centralTelecomunicationShelf[index]?.brand,
                  value: initialValues?.centralTelecomunicationShelf[index]?.brandId,
                }}
              />
            </div>
            <div className="col-3">
              <InputField
                name="serialNumber"
                label="Seriasi"
                value={initialValues?.centralTelecomunicationShelf[index]?.serialNumber}
                onChange={onChangeSerialNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="digitNumber"
                label="Raqami"
                value={initialValues?.centralTelecomunicationShelf[index]?.number}
                onChange={onChangeNumber}
              />
            </div>
            <div className="col-3">
              <InputField
                name="info"
                label="Qo'shimcha ma'lumot"
                onChange={onChangeInfo}
                value={initialValues?.centralTelecomunicationShelf[index]?.info}
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
