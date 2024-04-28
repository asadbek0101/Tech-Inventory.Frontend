import { useCallback, useState } from "react";
import { switchUsername } from "../../reducers/appReducer";
import { useAuthContext } from "../../api/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthProps } from "../../api/auth/AuthDto";
import { setToken, setUserId } from "../../reducers/authReducer";
import { toast } from "react-toastify";
import { useI18n } from "../../i18n/I18nContext";
import { showError } from "../../utils/NotificationUtils";
import AuthForm from "./AuthForm";

export default function AuthFormWrapper() {
  const { AuthApi } = useAuthContext();

  const { translate } = useI18n();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<AuthProps>({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(
    (value: AuthProps) => {
      console.log(value);
      if (value.username.length === 0) {
        toast.warn(translate("AUTH_REQUIRED_USERNAME_TITLE"));
      } else if (value.password.length === 0) {
        toast.warn(translate("AUTH_REQUIRED_PASSWORD_TITLE"));
      } else {
        setLoading(true);
        AuthApi.Login(value)
          .then((response: any) => {
            if (response?.data?.token) {
              setLoading(false);
              toast.success(response?.data?.message);
              dispatch(setToken({ token: response?.data?.token }));
              dispatch(setUserId({ userId: response?.data?.userId }));
              navigate("/dashboard/objects");
            } else {
              toast.error(response?.data?.message);
              setLoading(false);
            }
          })
          .catch((error: any) => {
            setLoading(false);
            showError(error);
          });
      }
    },
    [AuthApi, dispatch, navigate, translate],
  );

  return (
    <AuthForm
      initialValues={initialValues}
      setInitialValues={setInitialValues}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
}
