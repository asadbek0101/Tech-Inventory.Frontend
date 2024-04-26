import { useCallback, useEffect, useMemo, useState } from "react";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useNavigate } from "react-router-dom";
import { useProjectApiContext } from "../../api/projects/ProjectsApiContext";
import { showError } from "../../utils/NotificationUtils";
import { ProjectFilter } from "../../filters/ProjectFilter";
import { toast } from "react-toastify";

import TabPage from "../tabs/TabPage";
import ProjectsForm from "./ProjectsForm";

interface Props {
  readonly filter: ProjectFilter;
}

export default function ProjectsFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState({
    name: "",
    info: "",
  });

  const navigate = useNavigate();
  const { translate } = useI18n();
  const { ProjectsApi } = useProjectApiContext();

  const projectId = useMemo(() => filter.getProjectId() || 0, [filter]);

  useEffect(() => {
    if (projectId) {
      ProjectsApi.getOneProject(Number(projectId))
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [ProjectsApi, projectId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (projectId) {
        const json = {
          ...value,
          id: projectId,
        };
        ProjectsApi.updateProject(json)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/projects/project-table`);
          })
          .catch(showError);
      } else {
        ProjectsApi.createProject(value)
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(`/dashboard/projects/project-table`);
          })
          .catch(showError);
      }
    },
    [ProjectsApi, projectId, navigate],
  );

  return (
    <TabPage
      headerComponent={
        <Button
          className=" px-3 text-light"
          bgColor={BgColors.Yellow}
          heigh="34px"
          onClick={() => navigate(`/dashboard/projects/project-table`)}
        >
          {translate("BACK_BUTTON_TITLE")}
        </Button>
      }
    >
      <ProjectsForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
