import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { showError } from "../../utils/NotificationUtils";
import { ShellTypes } from "../../api/shells/ShellsDto";
import { useShellsApiContext } from "../../api/shells/ShellsApiContext";
import { ProductTypes } from "../../api/AppDto";
import ShellsTable from "./ShellsTable";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  readonly filter: ObjectFilter;
  readonly shellType: ShellTypes;
  readonly productForForm?: ProductTypes;
}

export default function ShellsTableWrapper({ filter, shellType, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { ShellsApi } = useShellsApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      ShellsApi.getShells({ obyektId: objectId, shellType })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [ShellsApi, objectId]);
  return (
    <ShellsTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        ShellsApi.deleteShell({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
