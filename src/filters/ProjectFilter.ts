import { AppFilter, AppFilterProps } from "./AppFilter";

export enum ProjectFilterTabs {}

interface ProjectFilterProps extends AppFilterProps<ProjectFilterTabs> {
  readonly projectId?: string;
  readonly numberOfOrderId?: string;
}

export class ProjectFilter extends AppFilter<ProjectFilterTabs> {
  private readonly projectId: string;
  private readonly numberOfOrderId: string;
  public constructor({ projectId, numberOfOrderId, ...props } = {} as ProjectFilterProps) {
    super({ ...props });
    this.projectId = projectId || "";
    this.numberOfOrderId = numberOfOrderId || "";
  }

  public getNubmerOfOrderId() {
    return this.numberOfOrderId;
  }

  public getProjectId() {
    return this.projectId;
  }
}
