import { AppFilter, AppFilterProps } from "./AppFilter";

export enum ObjectClassFilterTabs {}

interface ObjectClassFilterProps extends AppFilterProps<ObjectClassFilterTabs> {
  readonly objectClassTypeId?: string;
  readonly objectClassId?: string;
}

export class ObjectClassFilter extends AppFilter<ObjectClassFilterTabs> {
  private readonly objectClassTypeId: string;
  private readonly objectClassId: string;
  public constructor(
    { objectClassTypeId, objectClassId, ...props } = {} as ObjectClassFilterProps,
  ) {
    super({ ...props });
    this.objectClassTypeId = objectClassTypeId || "";
    this.objectClassId = objectClassId || "";
  }

  public getObjectClassTypeId() {
    return this.objectClassTypeId;
  }

  public getObjectClassId() {
    return this.objectClassId;
  }
}
