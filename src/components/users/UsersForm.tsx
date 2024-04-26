import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";
import { useCallback } from "react";
import { update } from "immupdate";
import { object, string } from "yup";

interface Props {
  readonly initialValues: any;
  readonly roles: any;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
  email: string().required("Required!"),
  userName: string().required("Required!"),
  password: string(),
  phoneNumber: string().required("Required!"),
});

export default function UsersForm({ initialValues, setInitialValues, onSubmit, roles }: Props) {
  const { translate } = useI18n();

  const onChangeEmail = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          email: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangePhoneNumber = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          phoneNumber: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeUsername = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          userName: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangePassword = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          password: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  return (
    <div className="p-3">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validationSchema={validationSchema}
      >
        {() => (
          <Form>
            <div className="row p-4">
              <div className="col-8">
                <GroupBox title="USERS_FORM_CRATE_USER_TITLE">
                  <div className="row">
                    <div className="col-6 my-2">
                      <InputField
                        label="USERS_FORM_USER_EMAIL_FIELD_TITLE"
                        name="email"
                        value={initialValues.email}
                        onChange={onChangeEmail}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <InputField
                        label="USERS_FORM_USER_NAME_FIELD_TITLE"
                        name="userName"
                        value={initialValues.userName}
                        onChange={onChangeUsername}
                      />
                    </div>
                    <div className="col-6 my-2">
                      <InputField
                        label="Phone Number"
                        name="phoneNumber"
                        value={initialValues.phoneNumber}
                        onChange={onChangePhoneNumber}
                      />
                    </div>
                    {!initialValues.id && (
                      <div className="col-6 my-2">
                        <InputField
                          label="USERS_FORM_USER_PASSWORD_FIELD_TITLE"
                          name="password"
                          value={initialValues.password}
                          onChange={onChangePassword}
                          disabled={initialValues.id}
                        />
                      </div>
                    )}
                    <div className="col-12 d-flex justify-content-end mt-3">
                      <Button
                        type="submit"
                        className="px-3 py-2 text-light"
                        bgColor={BgColors.Green}
                      >
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
    </div>
  );
}
