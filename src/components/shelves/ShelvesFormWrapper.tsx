import { useCallback, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { ShelfInitialProps, ShelfTypes } from "../../api/shelf/ShelfDto";
import { useNavigate } from "react-router-dom";
import { useShelfApiContext } from "../../api/shelf/ShelfApiContext";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";

import ShelvesForm from "./ShelvesForm";

interface Props {
  readonly filter: ObjectFilter;
  readonly shelfType: ShelfTypes;
}

export default function ShelvesFormWrapper({ filter, shelfType }: Props) {
  const [initialValues, setInitalValues] = useState<ShelfInitialProps>({
    obyektId: 0,
    number: "",
    info: "",
    serialNumber: "",
    shelfType: shelfType,
  });

  const { ShelfApi } = useShelfApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
      };
      ShelfApi.createShelf(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [ShelfApi],
  );

  return (
    <ShelvesForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
    />
  );
}
