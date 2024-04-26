import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback } from "react";
import { update } from "immupdate";
import { object, string } from "yup";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
  name: string().required("Required!"),
  _info: string(),
});

export default function ProjectsForm({ initialValues, setInitialValues, onSubmit }: Props) {
  const { translate } = useI18n();

  const onChangeName = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          name: event?.target.value,
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
              <GroupBox title="PROJECT_FORM_CREATE_PROJECT_TITLE">
                <div className="row">
                  <div className="col-12">
                    <InputField
                      name="name"
                      label="PROJECT_FORM_PROJECT_NAME_COLUMN_TITLE"
                      onChange={onChangeName}
                      value={initialValues?.name}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <TextAreaField
                      name="_info"
                      label="PROJECT_FORM_PROJECT_INFO_COLUMN_TITLE"
                      onChange={onChangeInfo}
                      defaultValue={initialValues?.info}
                    />
                  </div>
                  <div className="col-12 d-flex justify-content-end mt-3">
                    <Button type="submit" className="px-3 py-2 text-light" bgColor={BgColors.Green}>
                      {translate("SAVE_BUTTON_TITLE")}
                    </Button>
                  </div>
                </div>
              </GroupBox>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
