import { useCallback, useEffect, useMemo, useState } from "react";
import { DistrictProps } from "../../api/districts/DistrictsDto";
import { useI18n } from "../../i18n/I18nContext";
import { useNavigate } from "react-router-dom";
import { useDistrictsApiContext } from "../../api/districts/DistrictsApiContext";
import { toast } from "react-toastify";
import { ObjectClassFilter } from "../../filters/ObjectClassFilter";
import Button, { BgColors } from "../ui/Button";
import { showError } from "../../utils/NotificationUtils";

import TabPage from "../tabs/TabPage";
import ObjectClassForm from "./ObjectClassForm";
import { useOjbectClassApiContext } from "../../api/object-class/ObjectClassApiContext";
import { ObjectClassInitialProps } from "../../api/object-class/ObjectClassDto";

interface Props {
  readonly filter: ObjectClassFilter;
}

export default function ObjectClassFormWrapper({ filter }: Props) {
  const navigate = useNavigate();

  const { translate } = useI18n();
  const { ObjectClassApi } = useOjbectClassApiContext();

  const [initialValues, setInitialValues] = useState<ObjectClassInitialProps>({
    objectClassTypeId: 0,
    name: "",
    info: "",
  });

  const objectClassTypeId = useMemo(() => filter.getObjectClassTypeId() || 0, [filter]);
  const objectClassId = useMemo(() => filter.getObjectClassId() || 0, [filter]);

  useEffect(() => {
    if (objectClassId) {
      ObjectClassApi.getOneObjectClass({ id: Number(objectClassId) })
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [ObjectClassApi, objectClassId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (objectClassId) {
        ObjectClassApi.updateObjectClass({ ...value, objectClassTypeId, id: objectClassId })
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(
              `/dashboard/object-classes/class-table?objectClassTypeId=${objectClassTypeId}`,
            );
          })
          .catch(showError);
      } else {
        ObjectClassApi.createObjectClass({ ...value, objectClassTypeId })
          .then((r) => {
            toast.success(r?.data?.message);
            navigate(
              `/dashboard/object-classes/class-table?objectClassTypeId=${objectClassTypeId}`,
            );
          })
          .catch(showError);
      }
    },
    [objectClassId, navigate, ObjectClassApi, objectClassTypeId],
  );

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Yellow}
            heigh="34px"
            onClick={() =>
              navigate(
                `/dashboard/object-classes/class-table?objectClassTypeId=${objectClassTypeId}`,
              )
            }
          >
            {translate("BACK_BUTTON_TITLE")}
          </Button>
        </div>
      }
    >
      <ObjectClassForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
