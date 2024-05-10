import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { useVideoRecorderApiContext } from "../../api/video-recorder/VideoRecorderApiContext";
import { ProductTypes } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VideoRecordersTable from "./VideoRecorderTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
}

export default function VideoRecordersTableWrapper({ filter, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { VideoRecorderApi } = useVideoRecorderApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      VideoRecorderApi.getVideoRecorders({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [VideoRecorderApi, objectId]);
  return (
    <VideoRecordersTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        VideoRecorderApi.deleteVideoRecorder({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
