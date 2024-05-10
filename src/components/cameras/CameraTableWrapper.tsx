import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { ProductTypes } from "../../api/AppDto";
import { useNavigate } from "react-router-dom";
import { useCameraApiContext } from "../../api/cameras/CameraApiContext";
import { toast } from "react-toastify";
import { CameraTypes } from "../../api/cameras/CameraDto";

import CameraTable from "./CameraTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
  readonly cameraType: CameraTypes;
}

export default function CameraTableWrapper({ filter, productForForm, cameraType }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { CameraApi } = useCameraApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      CameraApi.getCameras({ obyektId: objectId, cameraType })
        .then((r) => {
          setLoading(false);
          setData(r?.data);
        })
        .catch(showError);
    }
  }, [CameraApi, objectId]);

  return (
    <CameraTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        CameraApi.deleteCamera({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
