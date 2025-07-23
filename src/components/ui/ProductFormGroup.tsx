import "./assets/product-form-group.scss";
import React, { ReactNode, useMemo } from "react";
import cx from "classnames";

import { GroupBox } from "./GroupBox";
import { useQuery } from "../../hooks/useQuery";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";

interface Props {
  readonly title: string;
  readonly children: ReactNode;
  readonly addClick: () => void;
}

export default function ProductFormGroup({ title, children, addClick }: Props) {
  const query = useQuery();

  const filter = useMemo(() => new ObjectFilter(query), [query]);

  const tab = useMemo(() => filter.getTab() || ObjectFilterTabs.ObjectForm, [filter]);

  return (
    <div className="product-form-group px-4 mt-2">
      <div
        className="product-form-group-header"
        onClick={() => tab === ObjectFilterTabs.ObjectForm && addClick()}
      >
        <div
          className={cx("product-form-group-title", {
            "active-form-group-title": Boolean(React.Children.count(children) > 0),
          })}
        >
          <span>{title}</span>
        </div>
      </div>
      {Boolean(React.Children.count(children) > 0) && (
        <div className="product-form-group-body">
          <GroupBox>
            <div className="product-from-group-items">{children}</div>
          </GroupBox>
        </div>
      )}
    </div>
  );
}
