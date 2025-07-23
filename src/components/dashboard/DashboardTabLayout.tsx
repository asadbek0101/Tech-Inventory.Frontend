import { ReactNode } from "react";

interface Props {
  readonly children?: ReactNode;
}

export default function DashboardTabLayout({ children }: Props) {
  return <div className="w-100 h-100 p-3">{children}</div>;
}
