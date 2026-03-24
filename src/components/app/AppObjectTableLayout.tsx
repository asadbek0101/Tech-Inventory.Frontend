import "./assets/app-object-table-layout.scss";

import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
  readonly sidebarComponent: ReactNode;
}

export default function AppObjectTableLayout({ children, sidebarComponent }: Props) {
  return (
    <div className="app-object-table-layout">
      <div className="app-object-table-body">{children}</div>
      <div className="app-object-table-sidebar-wrapper">
        <div className="app-object-table-sidebar">{sidebarComponent}</div>
      </div>
    </div>
  );
}
