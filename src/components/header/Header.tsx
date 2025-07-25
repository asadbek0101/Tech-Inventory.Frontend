import "./assets/header.scss";
import { useMemo } from "react";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appLanguageSelector, switchLanguage } from "../../reducers/appReducer";
import { profileSelector } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";

import LogoutButton from "./LogoutButton";
import MenuButton from "./MenuButton";
import { AppLanguage } from "../../i18n/I18nContext";
import HeaderLanguage from "./HeaderLanguage";

interface Props {
  readonly onChangeMenu: () => void;
  readonly onChangeLogout: () => void;
}

export default function Header({ onChangeMenu, onChangeLogout }: Props) {
  const profile = useShallowEqualSelector(profileSelector);
  const appLanguage = useShallowEqualSelector(appLanguageSelector);

  const dispatch = useDispatch();

  const username = useMemo(() => profile?.name || "", [profile]);

  dispatch(switchLanguage({ language: AppLanguage.Uzbek }));

  return (
    <header>
      <div className="h-100 d-flex justify-conent-center align-items-center">
        <MenuButton onClick={onChangeMenu} />
        <span className="text-light ms-3">{username}</span>
      </div>
      <div className="h-100 d-flex justify-conent-center align-items-center gap-3">
        <LogoutButton onClick={onChangeLogout} />
      </div>
    </header>
  );
}
