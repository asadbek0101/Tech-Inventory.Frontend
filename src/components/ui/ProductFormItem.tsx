import "./assets/product-form-group.scss";

import { useQuery } from "../../hooks/useQuery";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { ReactNode, useMemo } from "react";

import DeleteIcon from "../icons/DeleteIcon";
import Button, { BgColors } from "./Button";

interface Props {
  readonly index: number;
  readonly children: ReactNode;
  readonly deleteClick: (index: number) => void;
}

export default function ProductFormItem({ index, children, deleteClick }: Props) {
  const query = useQuery();

  const filter = useMemo(() => new ObjectFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || ObjectFilterTabs.ObjectForm, [filter]);
  return (
    <div key={index} className="product-form-group-item">
      <div className="product-form-group-children-number">{index + 1})</div>
      <div className="product-form-group-children">{children}</div>
      {Boolean(tab === ObjectFilterTabs.ObjectForm) && (
        <div className="product-form-group-delete-button">
          <Button className="px-2 py-2" bgColor={BgColors.Red} onClick={() => deleteClick(index)}>
            <DeleteIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
