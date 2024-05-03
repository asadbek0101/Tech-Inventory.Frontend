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
import { SelectPickerField } from "../form/SelectPrickerField";
import { BoxesInitialProps } from "../../api/boxes/BoxesDto";

interface Props {
  readonly initialValues: BoxesInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
  readonly formType?: ProductFormTypes;
  readonly models: SelectPickerOptionsProps[];
}

const validationSchema = object({
  info: string(),
});

export default function BoxesForm({
  formType = ProductFormTypes.WithOutObjectForm,
  initialValues,
  setInitialValues,
  onSubmit,
  models,
}: Props) {
  const { translate } = useI18n();

  const onChangeMeter = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          meter: event?.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeTypeId = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          typeId: event,
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
                      name="typeId"
                      label="Turi"
                      onChanges={onChangeTypeId}
                      options={models}
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <InputField
                      name="meter"
                      label="Uzunligi"
                      value={initialValues.meter}
                      onChange={onChangeMeter}
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
