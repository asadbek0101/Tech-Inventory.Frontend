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
import { useRegionApiContext } from "../../api/regions/RegionsApiContext";
import { useDistrictsApiContext } from "../../api/districts/DistrictsApiContext";

interface Props {
  readonly filter: UserFilter;
}

export default function UsersFormWrapper({ filter }: Props) {
  const { UsersApi } = useUsersContext();
  const { RegionsApi } = useRegionApiContext();
  const { DistrictsApi } = useDistrictsApiContext();

  const [roles, setRoles] = useState<any>([]);
  const { translate } = useI18n();
  const navigate = useNavigate();

  const userId = useMemo(() => filter.getUserId(), [filter]);

  const [initialValues, setIntialValues] = useState({
    email: "",
    userName: "",
    phoneNumber: "",
    role: "",
    regionId: 0,
    districtId: 0,
  });

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    RegionsApi.getRegionsList()
      .then((r) => {
        const _regions = r?.data?.map((region: any) => {
          return {
            label: region.name,
            value: region.id,
          };
        });
        setRegions(_regions);
      })
      .catch(showError);
  }, [RegionsApi]);

  useEffect(() => {
    if (userId) {
      UsersApi.getOneUser(Number(userId))
        .then((r: any) => {
          var json = {
            ...r?.data,
            regionId: {
              label: r?.data?.region,
              value: r?.data?.regionId,
            },
            districtId: {
              label: r?.data?.district,
              value: r?.data?.districtId,
            },
            role: {
              label: r?.data?.role[0],
              value: r?.data?.role[0]?.toUpperCase(),
            },
          };
          setIntialValues(json);
        })
        .catch(showError);
    }
  }, [userId, UsersApi]);

  useEffect(() => {
    UsersApi.getRolesList()
      .then((r: any) => {
        const _roles = r?.data.map((role: any) => {
          return {
            label: role.name,
            value: role.normalizedName,
          };
        });
        setRoles(_roles);
      })
      .catch(showError);
  }, [userId, UsersApi]);

  const onChangeRegion = useCallback(
    (value: any) => {
      DistrictsApi.getDistrictsList({ regionId: value.value })
        .then((r) => {
          const _districts = r?.data?.map((d: any) => {
            return {
              label: d.name,
              value: d.id,
            };
          });
          setDistricts(_districts);
        })
        .catch(showError);

      setIntialValues((prev: any) =>
        update(prev, {
          regionId: value,
          districtId: {
            label: "",
            value: "",
          },
        }),
      );
    },
    [DistrictsApi],
  );

  const onSubmit = useCallback(
    (value: any) => {
      if (userId) {
        const json: CreateUserProps = {
          ...value,
          id: userId,
          regionId: value?.regionId?.value,
          districtId: value?.districtId?.value,
          roleName: value?.role?.value,
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
          regionId: value?.regionId?.value,
          districtId: value?.districtId?.value,
          roleName: value?.role?.value,
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
        regions={regions}
        districts={districts}
        roles={roles}
        initialValues={initialValues}
        onChangeRegionId={onChangeRegion}
        setInitialValues={setIntialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
