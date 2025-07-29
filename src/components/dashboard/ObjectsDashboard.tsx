import BarChart from "../charts/BarChart";
import DiagramChart from "../charts/DiagramChart";

import { useDashboardApiContext } from "../../api/dashboard/DashboardApiContext";
import { useEffect, useState } from "react";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

export default function ObjectsDashboard() {
  const [initialFilter, setInitialFilter] = useState({
    regionId: 0,
    projectId: 0,
    classTypeId: 0,
  });

  const [regions, setRegionsLabels] = useState<any>({
    labels: [],
    counts: [],
    ids: [],
    title: "",
  });

  const [project, setProjectLabels] = useState({
    labels: [],
    counts: [],
    ids: [],
    title: "",
  });

  const [classifications, setClassificationsLabels] = useState({
    labels: [],
    counts: [],
    ids: [],
    title: "",
  });

  const { DashboardApi } = useDashboardApiContext();

  useEffect(() => {
    DashboardApi.getObjects({
      regionId: initialFilter?.regionId,
      projectId: initialFilter?.projectId,
      classTypeId: initialFilter?.classTypeId,
    })
      .then((r) => {
        const _regionsLabels: any = r?.data?.regions?.map((item: any) => item?.label);
        const _regionsCounts: any = r?.data?.regions?.map((item: any) => item.value);
        const _regionsIds: any = r?.data?.regions?.map((item: any) => item.id);

        const _classificationsLabels: any = r?.data?.classifications?.map(
          (item: any) => item.label,
        );
        const _classificationsCounts: any = r?.data?.classifications?.map(
          (item: any) => item.value,
        );

        const _classificationsIds: any = r?.data?.classifications?.map((item: any) => item.id);

        const _projectsLabels: any = r?.data?.projects?.map((item: any) => item.label);
        const _projectsCounts: any = r?.data?.projects?.map((item: any) => item.value);
        const _projectsIds: any = r?.data?.projects?.map((item: any) => item.id);

        setRegionsLabels((prev: any) =>
          update(prev, {
            labels: _regionsLabels,
            counts: _regionsCounts,
            ids: _regionsIds,
            title: r?.data?.regionTitle,
          }),
        );

        setClassificationsLabels((prev: any) =>
          update(prev, {
            labels: _classificationsLabels,
            counts: _classificationsCounts,
            ids: _classificationsIds,
            title: r?.data?.classTitle,
          }),
        );

        setProjectLabels((prev: any) =>
          update(prev, {
            labels: _projectsLabels,
            counts: _projectsCounts,
            ids: _projectsIds,
            title: r?.data?.projectTitle,
          }),
        );
      })
      .catch(showError);
  }, [DashboardApi, initialFilter]);

  return (
    <div className="row h-100">
      <div className="col-5 h-50 pb-2">
        <DiagramChart
          labels={classifications?.labels}
          values={classifications?.counts}
          ids={classifications?.ids}
          title={classifications?.title}
          onClickPart={(value: any) => {
            setInitialFilter((prev: any) =>
              update(prev, {
                classTypeId: value?.id,
              }),
            );
          }}
          onClickTitle={() => {
            setInitialFilter((prev: any) =>
              update(prev, {
                classTypeId: 0,
              }),
            );
          }}
        />
      </div>
      <div className="col-7 h-50 pb-2">
        <BarChart
          labels={project?.labels}
          values={project?.counts}
          ids={project?.ids}
          title={project?.title}
          onClickBar={(value: any) => {
            setInitialFilter((prev: any) =>
              update(prev, {
                projectId: value?.id,
              }),
            );
          }}
          labelType="inline"
          onClickTitle={() => {
            setInitialFilter((prev: any) =>
              update(prev, {
                projectId: 0,
              }),
            );
          }}
        />
      </div>
      <div className="col-12 h-50 pt-2">
        <BarChart
          labels={regions?.labels}
          values={regions?.counts}
          ids={regions?.ids}
          title={regions?.title}
          onClickBar={(value: any) => {
            setInitialFilter((prev: any) =>
              update(prev, {
                regionId: value?.id,
              }),
            );
          }}
          onClickTitle={() => {
            setInitialFilter((prev: any) =>
              update(prev, {
                regionId: 0,
              }),
            );
          }}
        />
      </div>
    </div>
  );
}
