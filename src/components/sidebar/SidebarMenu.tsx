import "./assets/sidebar-menu.scss";
import { useI18n } from "../../i18n/I18nContext";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appMenuTypeSelector } from "../../reducers/appReducer";
import { AppMenuType, UserRoles } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { profileSelector } from "../../reducers/authReducer";
import { CheckRole } from "../../utils/CheckRole";

import SettingsIcon from "../icons/SettingsIcon";
import CustomLine from "../ui/CustomLine";
import SidebarItem from "./SidebarItem";
import CameraIcon from "../icons/CameraIcon";
import UsersIcon from "../icons/UsersIcon";
import LocationIcon from "../icons/LocationIcon";
import FlagIcon from "../icons/FlagIcon";
import LandMarkIcon from "../icons/LandMarkIcon";
import FileInvoiceIcon from "../icons/FileInvoiceIcon";
import { useMemo } from "react";

export default function SidebarMenu() {
  const { translate } = useI18n();

  const menu = useShallowEqualSelector(appMenuTypeSelector);

  const profile = useShallowEqualSelector(profileSelector);

  const navigate = useNavigate();

  const role = useMemo(() => profile?.role || "", [profile]);

  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu-header">
        {menu === AppMenuType.Opened && (
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard/objects")}
          >
            {role}
          </span>
        )}
      </div>
      <div className="sidebar-menu-menu">
        {(CheckRole(UserRoles.SuperAdmin, profile) ||
          CheckRole(UserRoles.Admin, profile) ||
          CheckRole(UserRoles.Staff, profile)) && (
          <SidebarItem link="objects" icon={<LandMarkIcon />}>
            {translate("SIDE_MENU_OBJECTS_TITLE")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.SuperAdmin, profile) || CheckRole(UserRoles.Admin, profile)) && (
          <SidebarItem link="regions" icon={<FlagIcon />}>
            {translate("SIDE_MENU_REGIONS_TITLE")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.SuperAdmin, profile) || CheckRole(UserRoles.Admin, profile)) && (
          <SidebarItem link="projects" icon={<FileInvoiceIcon />}>
            {translate("SIDE_MENU_PROJECTS_TITLE")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.SuperAdmin, profile) || CheckRole(UserRoles.Admin, profile)) && (
          <SidebarItem link="models" icon={<CameraIcon />}>
            {translate("Modellar")}
          </SidebarItem>
        )}
        {CheckRole(UserRoles.SuperAdmin, profile) && (
          <SidebarItem link="users" icon={<UsersIcon />}>
            {translate("SIDE_MENU_USERS_TITLE")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.SuperAdmin, profile) ||
          CheckRole(UserRoles.Admin, profile) ||
          CheckRole(UserRoles.Staff, profile)) && (
          <SidebarItem link="map" icon={<LocationIcon />}>
            {translate("SIDE_MENU_MAP_TITLE")}
          </SidebarItem>
        )}
        <CustomLine />
        <SidebarItem link="settings" icon={<SettingsIcon />}>
          {translate("SIDE_MENU_SETTINGS_TITLE")}
        </SidebarItem>
      </div>
    </div>
  );
}
