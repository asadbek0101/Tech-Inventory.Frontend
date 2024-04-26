import "./assets/custom-card.scss";

import cx from "classnames";
import { ReactNode } from "react";

interface Props {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly style?: any;
}

export default function CustomCard({ className, children, style }: Props) {
  return (
    <div className={cx("custom-card", className)} style={style}>
      {children}
    </div>
  );
}
