import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { useI18n } from "../../i18n/I18nContext";
import Button, { BgColors } from "../ui/Button";
import { useCallback } from "react";
import { update } from "immupdate";
import { object, string } from "yup";
import { SelectPickerField } from "../form/SelectPrickerField";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { UserIntialProps } from "../../api/users/UsersDto";
import ImageUploadField from "../form/ImageUploadField";

interface Props {
  readonly initialValues: UserIntialProps;
  readonly roles: SelectPickerOptionsProps[];
  readonly regions: SelectPickerOptionsProps[];
  readonly onChangeRegionId: (value: any) => void;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
  email: string().required("Required!"),
  userName: string().required("Required!"),
  password: string(),
  phoneNumber: string().required("Required!"),
});

export default function UsersForm({
  initialValues,
  onChangeRegionId,
  setInitialValues,
  onSubmit,
  roles,
  regions,
}: Props) {
  const { translate } = useI18n();

  const onChangeFirstName = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          firstName: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeLastName = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          lastName: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeMiddleName = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          middleName: value.target.value,
        }),
      );
    },
    [setInitialValues],
  );

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

  const onChangeRole = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          role: value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeImage = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          image: value,
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
              <div className="col-12">
                <GroupBox title="Foydalanuvchi">
                  <div className="row">
                    <div className="col-2">
                      <ImageUploadField
                        label="Rasm yuklash"
                        onChange={onChangeImage}
                        value={initialValues.image || ""}
                      />
                    </div>
                    <div className="col-10">
                      <div className="row">
                        <div className="col-4 my-2">
                          <InputField
                            label="Ism"
                            name="firstName"
                            value={initialValues.firstName}
                            onChange={onChangeFirstName}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputField
                            label="Familiya"
                            name="lastName"
                            value={initialValues.lastName}
                            onChange={onChangeLastName}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputField
                            label="Otasining ismi"
                            name="middleName"
                            value={initialValues.middleName}
                            onChange={onChangeMiddleName}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputField
                            label="Elektron pochta"
                            name="email"
                            value={initialValues.email}
                            onChange={onChangeEmail}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputField
                            label="Telefon raqam"
                            name="phoneNumber"
                            value={initialValues.phoneNumber}
                            onChange={onChangePhoneNumber}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <InputField
                            label="Username"
                            name="userName"
                            value={initialValues.userName}
                            onChange={onChangeUsername}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <SelectPickerField
                            label="Viloyat"
                            name="regionId"
                            options={regions}
                            onChanges={onChangeRegionId}
                          />
                        </div>
                        <div className="col-4 my-2">
                          <SelectPickerField
                            label="Role"
                            name="role"
                            options={roles}
                            onChanges={onChangeRole}
                          />
                        </div>

                        {!initialValues.id && (
                          <div className="col-4 my-2">
                            <InputField
                              label="Parol"
                              name="password"
                              value={initialValues.password}
                              onChange={onChangePassword}
                              disabled={initialValues?.id ? true : false}
                            />
                          </div>
                        )}
                      </div>
                    </div>

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
