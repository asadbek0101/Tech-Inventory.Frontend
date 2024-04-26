import { AppFilter, AppFilterProps } from "./AppFilter";

export enum DistrictFilterTabs { }

interface DistrictFilterProps extends AppFilterProps<DistrictFilterTabs> {
  readonly regionId?: string;
  readonly districtId?: string;
}

export class DistrictFilter extends AppFilter<DistrictFilterTabs> {
  private readonly regionId: string;
  private readonly districtId: string;
  public constructor({ regionId, districtId, ...props } = {} as DistrictFilterProps) {
    super({ ...props });
    this.regionId = regionId || "";
    this.districtId = districtId || "";
  }

  public getRegionId() {
    return this.regionId;
  }

  public getDistrictId() {
    return this.districtId;
  }
}
