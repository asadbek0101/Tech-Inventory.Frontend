import { SWRConfig } from "swr";
import { ReactNode } from "react";

import { I18nProvider } from "../i18n/I18nContext";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";
import { appLanguageSelector } from "../reducers/appReducer";
import { ApiProvider } from "../api/ApiContext";
import { tokenSelector, userIdSelector } from "../reducers/authReducer";
import { useAuthContext } from "../api/auth/AuthContext";

interface Props {
  readonly children: ReactNode;
}

export function ProviderContainer({ children }: Props) {
  const language = useShallowEqualSelector(appLanguageSelector);
  const token = useShallowEqualSelector(tokenSelector);

  const userId = useShallowEqualSelector(userIdSelector);

  const { logout } = useAuthContext();

  return (
    <I18nProvider data={{ language }}>
      <ApiProvider data={{ token, language, userId: userId, logout }}>
        <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
      </ApiProvider>
    </I18nProvider>
  );
}
