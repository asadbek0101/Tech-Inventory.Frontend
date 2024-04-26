import { AppFilter, AppFilterProps } from "./AppFilter";

export enum ObjectClassFilterTabs { }

interface ObjectClassFilterProps extends AppFilterProps<ObjectClassFilterTabs> {
    readonly objectClassTypeId?: string;
}

export class ObjectClassFilter extends AppFilter<ObjectClassFilterTabs> {
    private readonly objectClassTypeId: string;
    public constructor({ objectClassTypeId, ...props } = {} as ObjectClassFilterProps) {
        super({ ...props });
        this.objectClassTypeId = objectClassTypeId || "";
    }

    public getObjectClassTypeId() {
        return this.objectClassTypeId;
    }
}
