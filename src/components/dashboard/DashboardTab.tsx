import { useEffect, useState } from "react";
import { useDashboardApiContext } from "../../api/dashboard/DashboardApiContext";
import { showError } from "../../utils/NotificationUtils";

import DashboardTabLayout from "./DashboardTabLayout";
import DashboardUsers from "./DashboardUsers";
import ObjectsDashboard from "./ObjectsDashboard";

export default function DashboardTab() {
  const [users, setUsers] = useState([]);

  const { DashboardApi } = useDashboardApiContext();

  useEffect(() => {
    DashboardApi.getUsers()
      .then((r) => {
        setUsers(r?.data);
      })
      .catch(showError);
  }, [DashboardApi]);

  return (
    <DashboardTabLayout>
      <div className="row h-100">
        <div className="col-10 h-100">
          <ObjectsDashboard />
        </div>
        <div className="col-2">
          <DashboardUsers data={users} />
        </div>
      </div>
    </DashboardTabLayout>
  );
}
