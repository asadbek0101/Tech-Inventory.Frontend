import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import { object, string } from "yup";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback } from "react";
import { update } from "immupdate";
import { ProductFormTypes } from "../../filters/ObjectFilter";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { NailInitialProps } from "../../api/nails/NailsDto";

interface Props {
  readonly initialValues: NailInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
  readonly formType?: ProductFormTypes;
}

const validationSchema = object({
  info: string(),
});

export default function NailsForm({
  formType = ProductFormTypes.WithOutObjectForm,
  initialValues,
  setInitialValues,
  onSubmit,
}: Props) {
  const { translate } = useI18n();

  const onChangeWeight = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          weight: event?.target.value,
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
                  <div className="col-12 mt-3">
                    <InputField
                      name="weight"
                      label="Og'irligi"
                      value={initialValues.weight}
                      onChange={onChangeWeight}
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <TextAreaField
                      name="_info"
                      label="Info"
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
