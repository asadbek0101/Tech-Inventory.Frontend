import { ModelTypes } from "../api/models/ModelsDto";
import { AppFilter, AppFilterProps } from "./AppFilter";

export enum ModelFilterTabs {}

interface ModelFilterProps extends AppFilterProps<ModelFilterTabs> {
  readonly modelId?: string;
  readonly type?: ModelTypes;
}

export class ModelFilter extends AppFilter<ModelFilterTabs> {
  private readonly modelId: string;
  private readonly type: ModelTypes | "";
  public constructor({ modelId, type, ...props } = {} as ModelFilterProps) {
    super({ ...props });
    this.modelId = modelId || "";
    this.type = type || "";
  }

  public getModelId() {
    return this.modelId;
  }

  public getModelType() {
    return this.type;
  }
}
