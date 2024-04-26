import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useProjectorApiContext } from "../../api/projectors/ProjectorApiContext";
import { showError } from "../../utils/NotificationUtils";
import ProjectorTable from "./ProjectorTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ProjectorTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { ProjectorApi } = useProjectorApiContext();

  useEffect(() => {
    if (objectId) {
      ProjectorApi.getProjectors({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [ProjectorApi, objectId]);

  return <ProjectorTable data={data} />;
}
