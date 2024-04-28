import "./assets/header.scss";
import { useMemo } from "react";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { profileSelector } from "../../reducers/authReducer";

import LogoutButton from "./LogoutButton";
import MenuButton from "./MenuButton";

interface Props {
  readonly onChangeMenu: () => void;
  readonly onChangeLogout: () => void;
}

export default function Header({ onChangeMenu, onChangeLogout }: Props) {
  const profile = useShallowEqualSelector(profileSelector);

  const username = useMemo(() => profile?.name || "", [profile]);

  return (
    <header>
      <div className="h-100 d-flex justify-conent-center align-items-center">
        <MenuButton onClick={onChangeMenu} />
        <span className="text-light ms-3">{username}</span>
      </div>
      <LogoutButton onClick={onChangeLogout} />
    </header>
  );
}
