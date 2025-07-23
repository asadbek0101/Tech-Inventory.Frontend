import "./assets/sidebar-menu.scss";
import { useI18n } from "../../i18n/I18nContext";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appMenuTypeSelector } from "../../reducers/appReducer";
import { AppMenuType, UserRoles } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { profileSelector } from "../../reducers/authReducer";
import { CheckRole } from "../../utils/CheckRole";
import { useMemo } from "react";

import SettingsIcon from "../icons/SettingsIcon";
import CustomLine from "../ui/CustomLine";
import SidebarItem from "./SidebarItem";
import CameraIcon from "../icons/CameraIcon";
import UsersIcon from "../icons/UsersIcon";
import LocationIcon from "../icons/LocationIcon";
import LandMarkIcon from "../icons/LandMarkIcon";
import FileInvoiceIcon from "../icons/FileInvoiceIcon";
import MapLocationIcon from "../icons/MapLocationIcon";
import DashboardIcon from "../icons/DashboardIcon";

export default function SidebarMenu() {
  const { translate } = useI18n();

  const menu = useShallowEqualSelector(appMenuTypeSelector);

  const profile = useShallowEqualSelector(profileSelector);

  const navigate = useNavigate();

  const role = useMemo(() => profile?.RoleName || "", [profile]);

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
      <CustomLine />

      <div className="sidebar-menu-menu">
        {(CheckRole(UserRoles.Programmer, profile) ||
          CheckRole(UserRoles.DepartmentHead, profile) ||
          CheckRole(UserRoles.ChiefSpecialist, profile) ||
          CheckRole(UserRoles.LeadingExpert, profile) ||
          CheckRole(UserRoles.SeniorSpecialist, profile)) && (
          <SidebarItem link="statistics" icon={<DashboardIcon />}>
            {translate("SIDE_MENU_DASHBOARD_TITLE")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.Programmer, profile) ||
          CheckRole(UserRoles.DepartmentHead, profile) ||
          CheckRole(UserRoles.ChiefSpecialist, profile) ||
          CheckRole(UserRoles.LeadingExpert, profile) ||
          CheckRole(UserRoles.SeniorSpecialist, profile)) && (
          <SidebarItem link="locations" icon={<LocationIcon />}>
            {translate("SIDE_MENU_MAP_TITLE")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.Programmer, profile) ||
          CheckRole(UserRoles.DepartmentHead, profile) ||
          CheckRole(UserRoles.ChiefSpecialist, profile) ||
          CheckRole(UserRoles.LeadingExpert, profile) ||
          CheckRole(UserRoles.SeniorSpecialist, profile)) && (
          <SidebarItem link="objects" icon={<LandMarkIcon />}>
            {translate("SIDE_MENU_OBJECTS_TITLE")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.Programmer, profile) ||
          CheckRole(UserRoles.DepartmentHead, profile) ||
          CheckRole(UserRoles.ChiefSpecialist, profile)) && (
          <SidebarItem link="projects" icon={<FileInvoiceIcon />}>
            {translate("SIDE_MENU_PROJECTS_TITLE")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.Programmer, profile) ||
          CheckRole(UserRoles.DepartmentHead, profile) ||
          CheckRole(UserRoles.ChiefSpecialist, profile)) && (
          <SidebarItem link="object-classes" icon={<MapLocationIcon />}>
            {translate("Tasniflar")}
          </SidebarItem>
        )}
        {(CheckRole(UserRoles.Programmer, profile) ||
          CheckRole(UserRoles.DepartmentHead, profile) ||
          CheckRole(UserRoles.ChiefSpecialist, profile)) && (
          <SidebarItem link="models" icon={<CameraIcon />}>
            {translate("Modellar")}
          </SidebarItem>
        )}
        {CheckRole(UserRoles.Programmer, profile) && (
          <SidebarItem link="users" icon={<UsersIcon />}>
            {translate("SIDE_MENU_USERS_TITLE")}
          </SidebarItem>
        )}

        <CustomLine />
        {(CheckRole(UserRoles.Programmer, profile) ||
          CheckRole(UserRoles.DepartmentHead, profile) ||
          CheckRole(UserRoles.ChiefSpecialist, profile) ||
          CheckRole(UserRoles.LeadingExpert, profile) ||
          CheckRole(UserRoles.SeniorSpecialist, profile)) && (
          <SidebarItem link="settings" icon={<SettingsIcon />}>
            {translate("SIDE_MENU_SETTINGS_TITLE")}
          </SidebarItem>
        )}
      </div>
    </div>
  );
}
