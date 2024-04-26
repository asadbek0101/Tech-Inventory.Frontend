import { useCallback, useEffect, useMemo, useState } from "react";
import { ModelsProps } from "../../api/models/ModelsDto";
import { useI18n } from "../../i18n/I18nContext";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { useNavigate } from "react-router-dom";
import { ModelFilter } from "../../filters/ModelFilter";
import { showError } from "../../utils/NotificationUtils";
import { toast } from "react-toastify";

import TabPage from "../tabs/TabPage";
import ModelsForm from "./ModelsForm";
import Button, { BgColors } from "../ui/Button";

interface Props {
  readonly filter: ModelFilter;
}

export default function ModelsFormWrapper({ filter }: Props) {
  const [initialValues, setInitialValues] = useState<ModelsProps>({
    name: "",
    info: "",
    type: 0,
  });

  const { translate } = useI18n();

  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const modelId = useMemo(() => filter.getModelId() || 0, [filter]);

  useEffect(() => {
    if (modelId) {
      ModelsApi.getOneModel({ id: Number(modelId) })
        .then((r) => setInitialValues(r?.data))
        .catch(showError);
    }
  }, [ModelsApi, modelId]);

  const onSubmit = useCallback(
    (value: any) => {
      if (modelId) {
        const json = {
          ...value,
          id: modelId,
          type: value.type.value,
        };
        ModelsApi.updateModel(json)
          .then((r) => {
            toast.success(r.data.message);
            navigate(`/dashboard/models/table`);
          })
          .catch(showError);
      } else {
        const json = {
          ...value,
          type: value.type.value,
        };
        ModelsApi.createModel(json)
          .then((r) => {
            toast.success(r.data.message);
            navigate(`/dashboard/models/table`);
          })
          .catch(showError);
      }
    },
    [navigate, ModelsApi, modelId],
  );
  return (
    <TabPage
      headerComponent={
        <Button
          className=" px-3 text-light"
          bgColor={BgColors.Yellow}
          heigh="34px"
          onClick={() => navigate(`/dashboard/models/table`)}
        >
          {translate("BACK_BUTTON_TITLE")}
        </Button>
      }
    >
      <ModelsForm
        initialValues={initialValues}
        setInitialValues={setInitialValues}
        onSubmit={onSubmit}
      />
    </TabPage>
  );
}
