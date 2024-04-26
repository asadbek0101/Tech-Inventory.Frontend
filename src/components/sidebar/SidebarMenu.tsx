import "./assets/sidebar-menu.scss";

import { useI18n } from "../../i18n/I18nContext";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appMenuTypeSelector } from "../../reducers/appReducer";
import { AppMenuType } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";

import MyLinksIcon from "../icons/MyLinksIcon";
import SettingsIcon from "../icons/SettingsIcon";
import CustomLine from "../ui/CustomLine";
import SidebarItem from "./SidebarItem";

export default function SidebarMenu() {
  const { translate } = useI18n();

  const menu = useShallowEqualSelector(appMenuTypeSelector);

  const navigate = useNavigate();

  return (
    <div className="sidebar-menu">
      <div className="sidebar-menu-header">
        {menu === AppMenuType.Opened && (
          <span
            style={{
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard/statistic")}
          ></span>
        )}
      </div>
      <div className="sidebar-menu-menu">
        <SidebarItem link="objects" icon={<MyLinksIcon />}>
          {translate("SIDE_MENU_OBJECTS_TITLE")}
        </SidebarItem>
        {/* <SidebarItem link="regions" icon={<MyLinksIcon />}>
          {translate("SIDE_MENU_REGIONS_TITLE")}
        </SidebarItem>
        <SidebarItem link="projects" icon={<MyLinksIcon />}>
          {translate("SIDE_MENU_PROJECTS_TITLE")}
        </SidebarItem>
        <SidebarItem link="models" icon={<MyLinksIcon />}>
          {translate("Modellar")}
        </SidebarItem>
        <SidebarItem link="users" icon={<MyLinksIcon />}>
          {translate("SIDE_MENU_USERS_TITLE")}
        </SidebarItem> */}
        <SidebarItem link="map" icon={<MyLinksIcon />}>
          {translate("SIDE_MENU_MAP_TITLE")}
        </SidebarItem>
        <CustomLine />
        <SidebarItem link="settings" icon={<SettingsIcon />}>
          {translate("SIDE_MENU_SETTINGS_TITLE")}
        </SidebarItem>
      </div>
    </div>
  );
}
