import { useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useTerminalServerApiContext } from "../../api/terminal-server/TerminalServerApiContext";
import { showError } from "../../utils/NotificationUtils";
import { useNavigate } from "react-router-dom";
import { ProductTypes } from "../../api/AppDto";
import { toast } from "react-toastify";

import TerminalServerTable from "./TerminalServersTable";

interface Props {
  readonly filter: ObjectFilter;
  readonly productForForm?: ProductTypes;
}

export default function TerminalServerTableWrapper({ filter, productForForm }: Props) {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);
  const product = useMemo(() => filter.getProduct() || productForForm, [filter]);

  const { TerminalServerApi } = useTerminalServerApiContext();

  useEffect(() => {
    if (objectId) {
      setLoading(true);
      TerminalServerApi.getTerminalServers({ obyektId: objectId })
        .then((r) => {
          setData(r?.data);
          setLoading(false);
        })
        .catch(showError);
    }
  }, [TerminalServerApi, objectId]);
  return (
    <TerminalServerTable
      data={data}
      loading={loading}
      edit={(value) =>
        navigate(
          `/dashboard/objects/object-products?productPageType=1&product=${product}&objectId=${objectId}&productId=${value}`,
        )
      }
      dele={(value) => {
        TerminalServerApi.deleteTerminalServer({ id: value })
          .then((r) => {
            toast.success(r?.data?.message);
            window.location.reload();
          })
          .catch(showError);
      }}
    />
  );
}
