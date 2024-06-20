import "./assets/app-auth-container-layout.scss";

import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

export default function AppAuthContainerLayout({ children }: Props) {
  return (
    <div className="app-auth-container-layout">
      <div className="safe-city-image" />
      <div className="app-auth-form">{children}</div>
      <span className="app-auth-container-version">V-0.0.12</span>
    </div>
  );
}
