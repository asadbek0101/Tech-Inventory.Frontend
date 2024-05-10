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
import { ProjectorInitalProps } from "../../api/projectors/ProjectorDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ProductFormTypes } from "../../filters/ObjectFilter";

interface Props {
  readonly initialValues: ProjectorInitalProps;
  readonly models: SelectPickerOptionsProps[];
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
  readonly formType?: ProductFormTypes;
}

const validationSchema = object({
  count: string().required("Required!"),
  info: string(),
});

export default function ProjectorForm({
  initialValues,
  setInitialValues,
  onSubmit,
  models,
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

  const onChangeCount = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          count: event?.target.value,
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
                      options={models}
                      onChanges={onChangeModelId}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="count"
                      label="Soni"
                      value={initialValues.count}
                      onChange={onChangeCount}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <TextAreaField
                      name="projector-info"
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
