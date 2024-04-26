import { useParams } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { useMemo } from "react";
import { DistrictFilter } from "../../filters/DistrictFilter";

import RegionsFormWrapper from "./RegionsFormWrapper";
import RegionsTableWrapper from "./RegionsTableWrapper";
import DistrictTableWrapper from "../districts/DistrictTableWrapper";
import DistrictFormWrapper from "../districts/DistrictFormWrapper";

export default function RegionsTab() {
  const { tab = "region-table" } = useParams();
  const query = useQuery();

  const districtFilter = useMemo(() => new DistrictFilter(query), [query]);

  return (
    <>
      {tab === "region-table" && <RegionsTableWrapper filter={districtFilter}/>}
      {tab === "district-table" && <DistrictTableWrapper filter={districtFilter} />}
      {tab === "district-form" && <DistrictFormWrapper filter={districtFilter} />}
      {tab === "region-form" && <RegionsFormWrapper filter={districtFilter}/>}
    </>
  );
}
