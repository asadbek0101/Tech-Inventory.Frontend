import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";

import Button, { BgColors } from "../ui/Button";
import TabPage from "../tabs/TabPage";
import { ObjectClassTypeInitialProps } from "../../api/object-class-type/ObjectClassTypeDto";
import ObjectClassTypeForm from "./ObjectClassTypeForm";
import { ObjectClassFilter } from "../../filters/ObjectClassFilter";
import { useOjbectClassTypeApiContext } from "../../api/object-class-type/ObjectClassTypeApiContext";

interface Props {
  readonly filter: ObjectClassFilter;
}

export default function ObjectClassTypeFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<ObjectClassTypeInitialProps>({
    name: "",
    info: "",
  });

  const { translate } = useI18n();

  const { ObjectClassTypeApi } = useOjbectClassTypeApiContext();

  const navigate = useNavigate();

  const objectClassTypeId = useMemo(() => filter.getObjectClassTypeId() || 0, [filter]);

  useEffect(() => {
    if (objectClassTypeId) {
      ObjectClassTypeApi.getOneObjectClassType({ id: Number(objectClassTypeId) })
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [ObjectClassTypeApi, objectClassTypeId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (objectClassTypeId) {
        const json = {
          ...value,
          id: objectClassTypeId,
        };
        ObjectClassTypeApi.updateObjectClassType(json)
          .then((r) => {
            toast.success(r.data.message);
            navigate(`/dashboard/object-classes/class-type-table`);
          })
          .catch(showError);
      } else {
        ObjectClassTypeApi.createObjectClassType(value)
          .then((r) => {
            toast.success(r.data.message);
            navigate(`/dashboard/object-classes/class-type-table`);
          })
          .catch(showError);
      }
    },
    [navigate, ObjectClassTypeApi, objectClassTypeId],
  );

  return (
    <TabPage
      headerComponent={
        <Button
          className=" px-3 text-light"
          bgColor={BgColors.Yellow}
          heigh="34px"
          onClick={() => navigate(`/dashboard/object-classes/class-type-table`)}
        >
          {translate("BACK_BUTTON_TITLE")}
        </Button>
      }
    >
      <ObjectClassTypeForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
