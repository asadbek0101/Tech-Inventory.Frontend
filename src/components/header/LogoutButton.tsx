import { useI18n } from "../../i18n/I18nContext";
import { AppTimerWrapper } from "../ui/Timer";
import "./assets/logout-button.scss";

interface Props {
  readonly onClick: () => void;
}

export default function LogoutButton({ onClick }: Props) {
  const { translate } = useI18n();

  return (
    <button className="logout-button d-flex gap-2" onClick={onClick}>
      {translate("LOGOUT_BUTTON_TITLE")}
      <AppTimerWrapper />
    </button>
  );
}
