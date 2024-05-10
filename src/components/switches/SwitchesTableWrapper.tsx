import { useEffect, useMemo, useState } from "react";
import { SwitchTypes } from "../../api/switches/SwitchesDto";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useSwitchesApiContext } from "../../api/switches/SwitchesApiContext";
import { showError } from "../../utils/NotificationUtils";
import { useNavigate } from "react-router-dom";
import { ProductTypes } from "../../api/AppDto";
import { toast } from "react-toastify";

import SwitchesTable from "./SwitchesTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly switchType: SwitchTypes;
  readonly productForForm?: ProductTypes;
}

export default function SwitchesTableWrapper({ filter, switchType, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { SwitchesApi } = useSwitchesApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      SwitchesApi.getSwitches({ obyektId: objectId, switchType })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [SwitchesApi, objectId, switchType]);
  return (
    <SwitchesTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        SwitchesApi.deleteSwitch({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
