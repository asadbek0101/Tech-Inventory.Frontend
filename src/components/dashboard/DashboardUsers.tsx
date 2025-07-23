import "./assets/dashboard-users.scss";

interface Props {
  readonly data: any[];
}

export default function DashboardUsers({ data }: Props) {
  return (
    <div className="dashboard-users">
      <div className="dashboard-users-title">Faol yaratuvchilar</div>
      {data &&
        data
          ?.sort((a, b) => b.value - a.value)
          .map((item: any, index) => {
            return (
              <div className="dashboard-users-item">
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
