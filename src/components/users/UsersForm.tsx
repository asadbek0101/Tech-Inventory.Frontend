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

interface Props {
  readonly initialValues: any;
  readonly roles: SelectPickerOptionsProps[];
  readonly regions: SelectPickerOptionsProps[];
  readonly districts: SelectPickerOptionsProps[];
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
  districts,
}: Props) {
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

  const onChangeDistrictId = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          districtId: value,
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
                        label="Tuman"
                        name="districtId"
                        options={districts}
                        onChanges={onChangeDistrictId}
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
