import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import { object, string } from "yup";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback } from "react";
import { update } from "immupdate";
import { SelectPickerField } from "../form/SelectPrickerField";
import { SwitchInitialProps } from "../../api/switches/SwitchesDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ProductFormTypes } from "../../filters/ObjectFilter";

interface Props {
  readonly initialValues: SwitchInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
  readonly formType?: ProductFormTypes;
  readonly switchModels: SelectPickerOptionsProps[];
}

const validationSchema = object({
  countOfPorts: string().required("Required!"),
});

export default function SwitchesForm({
  initialValues,
  setInitialValues,
  onSubmit,
  switchModels,
  formType = ProductFormTypes.WithOutObjectForm,
}: Props) {
  const { translate } = useI18n();

  const onChangeModelId = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          modelId: event,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeCountOfPorts = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          countOfPorts: event?.target.value,
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
                      name="modelId"
                      label="Modeli"
                      options={switchModels}
                      onChanges={onChangeModelId}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="countOfPorts"
                      label="Portlar soni"
                      disabled={initialValues.modelId === 0}
                      value={initialValues.countOfPorts}
                      onChange={onChangeCountOfPorts}
                    />
                  </div>

                  <div className="col-12 mt-3">
                    <TextAreaField
                      name="_info"
                      label="Qo'shimcha ma'lumot"
                      defaultValue={initialValues.info}
                      onChange={onChangeInfo}
                      disabled={initialValues.modelId === 0}
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
