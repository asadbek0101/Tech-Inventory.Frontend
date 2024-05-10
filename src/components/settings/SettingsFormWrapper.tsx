import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { switchLanguage } from "../../reducers/appReducer";
import { AppLanguage } from "../../i18n/I18nContext";
import { GroupBox } from "../ui/GroupBox";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { Profile, profileSelector, userIdSelector } from "../../reducers/authReducer";
import { update } from "immupdate";
import { useAuthContext } from "../../api/auth/AuthContext";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";

import Modal from "../ui/Modal";
import SettingsForm from "./SettingsForm";
import YesOrNoModal from "../ui/YesOrNoModal";
import { useUsersContext } from "../../api/users/UsersContext";
import SettingsUsersForm from "./SettingsUserForm";

export default function SettingsFormWrapper() {
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState({
    userEmail: "",
    userName: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [userInfo, setUserInfo] = useState({});

  const [languageModal, setLanguageModal] = useState(false);
  const [language, setLanguage] = useState<AppLanguage>(AppLanguage.English);

  const profile: Profile | undefined = useShallowEqualSelector(profileSelector);
  const userId = useShallowEqualSelector(userIdSelector);

  const { AuthApi } = useAuthContext();
  const { UsersApi } = useUsersContext();

  useEffect(() => {
    UsersApi.getOneUser(Number(userId))
      .then((r) => setUserInfo(r?.data))
      .catch(showError);
  }, [UsersApi, userId]);

  useEffect(() => {
    setInitialValues((prev: any) =>
      update(prev, {
        userEmail: profile?.email,
        userName: profile?.name,
      }),
    );
  }, [profile]);

  const savePassword = useCallback(
    (value: any) => {
      const json = {
        ...value,
        userId,
      };
      AuthApi.ResetPassword(json)
        .then((r) => {
          if (r?.isSuccess && !r?.isError) {
            toast.success(r?.data?.message);
            setInitialValues((prev: any) =>
              update(prev, {
                oldPassword: "",
                newPassword: "",
              }),
            );
          } else {
            toast.error(r?.data?.message);
          }
        })
        .catch(showError);
    },
    [userId, AuthApi],
  );

  return (
    <>
      <SettingsUsersForm initialValues={userInfo} />

      <SettingsForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        saveLanguage={(value) => {
          setLanguage(value);
          setLanguageModal(true);
        }}
        savePassword={savePassword}
      />
      <Modal
        show={languageModal}
        closeHandler={() => setLanguageModal(false)}
        className="d-flex justify-content-center align-items-center"
        contentClassName="rounded p-4"
        width="500px"
      >
        <GroupBox>
          <YesOrNoModal
            title="SETTINGS_FORM_LANGUAGE_QUESTION_TITLE"
            setResponse={(value: string) => {
              if (value === "YES") {
                dispatch(switchLanguage({ language: language }));
                setLanguageModal(false);
              } else {
                setLanguageModal(false);
              }
            }}
          />
        </GroupBox>
      </Modal>
    </>
  );
}
