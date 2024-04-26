import { useCallback, useEffect, useMemo, useState } from "react";
import { useUsersContext } from "../../api/users/UsersContext";
import { CreateUserProps } from "../../api/users/UsersDto";
import { useI18n } from "../../i18n/I18nContext";
import { useNavigate } from "react-router-dom";
import { TabPageType } from "../../api/AppDto";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { UserFilter } from "../../filters/UserFIlter";
import { update } from "immupdate";

import UsersForm from "./UsersForm";
import TabPage from "../tabs/TabPage";
import Button, { BgColors } from "../ui/Button";

interface Props {
  readonly filter: UserFilter;
}

export default function UsersFormWrapper({ filter }: Props) {
  const { UsersApi } = useUsersContext();

  const [roles, setRoles] = useState<any>([]);
  const { translate } = useI18n();
  const navigate = useNavigate();

  const userId = useMemo(() => filter.getUserId(), [filter]);

  const [initialValues, setIntialValues] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (userId) {
      UsersApi.getOneUser(Number(userId))
        .then((r: any) => {
          setIntialValues(r?.data);
        })
        .catch(showError);
    }
  }, [userId, UsersApi]);

  const onSubmit = useCallback(
    (value: any) => {
      if (userId) {
        const json: CreateUserProps = {
          ...value,
          id: userId,
        };
        UsersApi.updateUser(json)
          .then((r: any) => {
            if (r?.isSuccess) {
              toast.success(r?.data?.message);
              navigate(`/dashboard/users/${TabPageType.Table}`);
            } else {
              toast.error(r?.data?.message);
            }
          })
          .catch(showError);
      } else {
        const json: CreateUserProps = {
          ...value,
        };
        UsersApi.createUser(json)
          .then((r: any) => {
            if (r?.isSuccess) {
              toast.success(r?.data?.message);
              navigate(`/dashboard/users/${TabPageType.Table}`);
            } else {
              toast.error(r?.data?.message);
            }
          })
          .catch(showError);
      }
    },
    [UsersApi, navigate, userId],
  );

  return (
    <TabPage
      headerComponent={
        <Button
          className=" px-3 text-light"
          bgColor={BgColors.Yellow}
          heigh="34px"
          onClick={() => navigate(`/dashboard/users/${TabPageType.Table}`)}
        >
          {translate("BACK_BUTTON_TITLE")}
        </Button>
      }
    >
      <UsersForm
        roles={roles}
        initialValues={initialValues}
        setInitialValues={setIntialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
