import { useMemo } from "react";
import { ObjectFilter, ObjectProductsPageTypes } from "../../filters/ObjectFilter";

import ObjectProductsFormWrapper from "./ObjectProductsFormWrapper";
import ObjectProductsTableWrapper from "./ObjectProductsTableWrapper";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectProductsTabWrapper({ filter }: Props) {
  const pageType = useMemo(
    () => filter.getProductPageType() || ObjectProductsPageTypes.Table,
    [filter],
  );

  return (
    <>
      {pageType === ObjectProductsPageTypes.Table && <ObjectProductsTableWrapper filter={filter} />}
      {pageType === ObjectProductsPageTypes.Form && <ObjectProductsFormWrapper filter={filter} />}
    </>
  );
}
