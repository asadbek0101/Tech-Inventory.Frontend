import BarChart from "../charts/BarChart";
import DashboardTabLayout from "./DashboardTabLayout";
import DiagramChart from "../charts/DiagramChart";

import { useDashboardApiContext } from "../../api/dashboard/DashboardApiContext";
import { useEffect, useState } from "react";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";
import DashboardUsers from "./DashboardUsers";

export default function DashboardTab() {
  const { DashboardApi } = useDashboardApiContext();

  const [regions, setRegionsLabels] = useState<any>({
    labels: [],
    counts: [],
  });
  const [camera, setCameraLabels] = useState({
    labels: [],
    counts: [],
  });
  const [classifications, setClassificationsLabels] = useState({
    labels: [],
    counts: [],
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    DashboardApi.getGetAll()
      .then((r) => {
        console.log(r?.data);
        const _regionsLabels: any = r?.data?.regions?.map((item: any) => item?.label);
        const _regionsCounts: any = r?.data?.regions?.map((item: any) => item.value);

        const _classificationsLabels: any = r?.data?.classifications?.map(
          (item: any) => item.label,
        );
        const _classificationsCounts: any = r?.data?.classifications?.map(
          (item: any) => item.value,
        );

        const _cameraLabels: any = r?.data?.cameras?.map((item: any) => item.label);
        const _cameraCounts: any = r?.data?.cameras?.map((item: any) => item.value);

        setUsers(r?.data?.users);

        setRegionsLabels((prev: any) =>
          update(prev, {
            labels: _regionsLabels,
            counts: _regionsCounts,
          }),
        );

        setClassificationsLabels((prev: any) =>
          update(prev, {
            labels: _classificationsLabels,
            counts: _classificationsCounts,
          }),
        );

        setCameraLabels((prev: any) =>
          update(prev, {
            labels: _cameraLabels,
            counts: _cameraCounts,
          }),
        );
      })
      .catch(showError);
  }, [DashboardApi]);

  return (
    <DashboardTabLayout>
      <div className="row h-100">
        <div className="col-10 h-100">
          <div className="row h-100">
            <div className="col-5 h-50 pb-2">
              <DiagramChart
                labels={classifications?.labels}
                values={classifications?.counts}
                title="Tasniflar"
                onClickPart={(value: any) => {}}
              />
            </div>
            <div className="col-7 h-50 pb-2">
              <BarChart
                labels={camera?.labels}
                values={camera?.counts}
                title="Kameralar"
                onClickBar={(value: any) => {}}
              />
            </div>
            <div className="col-12 h-50 pt-2">
              <BarChart
                labels={regions?.labels}
                values={regions?.counts}
                title="Viloyatlar kesimida (Obyektlar)"
                onClickBar={(value: any) => {}}
              />
            </div>
          </div>
        </div>
        <div className="col-2">
          <DashboardUsers data={users} />
        </div>
      </div>
    </DashboardTabLayout>
  );
}
