import { AppFilter, AppFilterProps } from "./AppFilter";

export enum ProjectFilterTabs {}

interface ProjectFilterProps extends AppFilterProps<ProjectFilterTabs> {
  readonly projectId?: string;
}

export class ProjectFilter extends AppFilter<ProjectFilterTabs> {
  private readonly projectId: string;
  public constructor({ projectId, ...props } = {} as ProjectFilterProps) {
    super({ ...props });
    this.projectId = projectId || "";
  }

  public getProjectId() {
    return this.projectId;
  }
}
