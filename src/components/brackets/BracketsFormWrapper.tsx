import { useCallback, useEffect, useMemo, useState } from "react";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { useBracketsApiContext } from "../../api/brackets/BracketsApiContext";
import { BracketTypes, BracketsInitialProps } from "../../api/brackets/BracketsDto";
import BracketsForm from "./BracketsForm";

interface Props {
  readonly filter: ObjectFilter;
  readonly bracketType: BracketTypes;
}

export default function BracketsFormWrapper({ filter, bracketType }: Props) {
  const [initialValues, setInitalValues] = useState<BracketsInitialProps>({
    bracketType: bracketType,
    obyektId: 0,
    modelId: 0,
    info: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const { BracketsApi } = useBracketsApiContext();
  const { ModelsApi } = useModelsApiContext();

  const navigate = useNavigate();

  const objectId = useMemo(() => filter.getObyektId() || 0, [filter]);

  useEffect(() => {
    ModelsApi.getModelsList({ type: ModelTypes.Bracket })
      .then((r) => {
        const _models = r?.data.map((sw: any) => {
          return {
            label: sw.name,
            value: sw.id,
          };
        });
        setModels(_models);
      })
      .catch(showError);
  }, [ModelsApi]);

  const onSubmit = useCallback(
    (value: any) => {
      const json = {
        ...value,
        obyektId: objectId,
        modelId: value.modelId.value,
      };
      BracketsApi.createBracket(json)
        .then((r) => {
          toast.success(r?.data?.message);
          navigate(`/dashboard/objects/object-view?objectId=${objectId}`);
        })
        .catch(showError);
    },
    [BracketsApi, objectId],
  );

  return (
    <BracketsForm
      initialValues={initialValues}
      setInitialValues={setInitalValues}
      onSubmit={onSubmit}
      models={models}
    />
  );
}
