import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import { object, string } from "yup";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback } from "react";
import { update } from "immupdate";
import { ShelfInitialProps } from "../../api/shelf/ShelfDto";
import { ProductFormTypes } from "../../filters/ObjectFilter";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { SelectPickerField } from "../form/SelectPrickerField";

interface Props {
  readonly initialValues: ShelfInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
  readonly formType?: ProductFormTypes;
  readonly models: SelectPickerOptionsProps[];
}

const validationSchema = object({
  serialNumber: string().required("Required!"),
  number: string().required("Required!"),
  info: string(),
});

export default function ShelvesForm({
  initialValues,
  setInitialValues,
  onSubmit,
  models,
  formType = ProductFormTypes.WithOutObjectForm,
}: Props) {
  const { translate } = useI18n();

  const onChangeBrandId = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          brandId: event,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeNumber = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          number: event?.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeSerialNumber = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          serialNumber: event?.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          info: event?.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {() => (
        <Form>
          <div className="row p-4">
            <div className="col-6">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <SelectPickerField
                      name="brandId"
                      label="Markasi"
                      onChanges={onChangeBrandId}
                      options={models}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="serailNumber"
                      label="Seriasi"
                      value={initialValues.serialNumber}
                      onChange={onChangeSerialNumber}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="digitNumber"
                      label="Raqami"
                      value={initialValues.number}
                      onChange={onChangeNumber}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <TextAreaField
                      name="_info"
                      label="Qo'shimcha ma'lumot"
                      onChange={onChangeInfo}
                      defaultValue={initialValues.info}
                    />
                  </div>
                  {formType === ProductFormTypes.WithOutObjectForm && (
                    <div className="col-12 d-flex justify-content-end mt-3">
                      <Button
                        type="submit"
                        className="px-3 py-2 text-light"
                        bgColor={BgColors.Green}
                      >
                        {translate("SAVE_BUTTON_TITLE")}
                      </Button>
                    </div>
                  )}
                </div>
              </GroupBox>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
