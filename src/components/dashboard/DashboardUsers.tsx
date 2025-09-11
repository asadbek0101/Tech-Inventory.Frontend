import "./assets/dashboard-users.scss";

import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { profileSelector } from "../../reducers/authReducer";

import cx from "classnames";

interface Props {
  readonly data: any[];
  readonly onClickUser: (value: any) => void;
}

export default function DashboardUsers({ data, onClickUser }: Props) {
  const profile = useShallowEqualSelector(profileSelector);

  return (
    <div className="dashboard-users">
      <div className="dashboard-users-title">Faol yaratuvchilar</div>
      {data &&
        data
          ?.sort((a, b) => b.value - a.value)
          .map((item: any, index) => {
            return (
              <div
                className={cx("dashboard-users-item", {
                  "text-success fw-bold": profile?.UserId == item?.id,
                })}
                onClick={() => onClickUser({ id: item?.id })}
              >
                <div>
                  {index + 1}.{item?.label}
                </div>
                <div>{item?.value}</div>
              </div>
            );
          })}
    </div>
  );
}
