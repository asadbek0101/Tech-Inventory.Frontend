import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useRackApiContext } from "../../api/rackes/RackesApiContext";
import { RackTypes } from "../../api/rackes/RackesDto";
import { showError } from "../../utils/NotificationUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProductTypes } from "../../api/AppDto";

import RackesTable from "./RackesTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly rackType: RackTypes;
  readonly productForForm?: ProductTypes;
}

export default function RackesTableWrapper({ filter, rackType, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { RackesApi } = useRackApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      RackesApi.getRackes({ obyektId: objectId, rackType })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [RackesApi, objectId, rackType]);

  return (
    <RackesTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        RackesApi.deleteRack({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
