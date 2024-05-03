import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useVideoRecorderApiContext } from "../../api/video-recorder/VideoRecorderApiContext";
import VideoRecordersTable from "./VideoRecorderTable";

interface Props {
  readonly filter: ObjectFilter;
}

export default function VideoRecordersTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>([]);

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const { VideoRecorderApi } = useVideoRecorderApiContext();

  useEffect(() => {
    if (objectId) {
      VideoRecorderApi.getVideoRecorders({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [VideoRecorderApi, objectId]);
  return <VideoRecordersTable data={data} />;
}
