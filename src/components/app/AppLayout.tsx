import "./assets/app-layout.scss";
import AppHeaderWrapper from "./AppHeaderWrapper";
import AppSidebarWrapper from "./AppSidebarWrapper";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appMenuTypeSelector, switchMenuType } from "../../reducers/appReducer";
import { AppMenuType } from "../../api/AppDto";
import { useAuthContext } from "../../api/auth/AuthContext";

interface Props {
  readonly children: ReactNode;
}

export default function AppLayout({ children }: Props) {
  const menuType = useShallowEqualSelector(appMenuTypeSelector);
  const { logout } = useAuthContext();
  const dispatch = useDispatch();

  return (
    <div className="app-layout-container">
      <div
        className={`app-sidebar ${menuType === AppMenuType.Closed ? "close-app-sidebar-menu" : ""}`}
      >
        <AppSidebarWrapper />
      </div>
      <div className={`app-pages ${menuType === AppMenuType.Closed ? "full-app-pages" : ""}`}>
        <div className="app-pages-header">
          <AppHeaderWrapper
            onChangeMenu={() => {
              dispatch(
                switchMenuType({
                  menuType:
                    menuType === AppMenuType.Opened ? AppMenuType.Closed : AppMenuType.Opened,
                }),
              );
            }}
            onChangeLogout={logout}
          />
        </div>
        <div className="app-pages-page">{children}</div>
      </div>
    </div>
  );
}
