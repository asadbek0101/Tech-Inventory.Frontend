import "./assets/table.scss";

import { useCallback, useState, ReactNode, useEffect } from "react";

import Loader from "../ui/Loader";

interface HeaderProps {
  readonly width?: number;
  readonly access: string;
  readonly header: string;
  readonly ceil?: ReactNode;
  readonly searchHidden?: boolean;
}

interface TableProps {
  readonly headers: HeaderProps[];
  readonly data: any[];
  readonly selectRowCheckbox?: (select: any[]) => void;
  readonly searchHeader?: (value: string, type: string) => void;
  readonly withCheckbox?: boolean;
  readonly loading?: boolean;
}

export default function Table({
  data,
  headers,
  selectRowCheckbox,
  withCheckbox = false,
  searchHeader,
  loading = false,
}: TableProps) {
  const [dataTable, setDataTable] = useState<any[]>([]);
  useEffect(() => {
    setDataTable(data);
  }, [setDataTable, data]);

  const setIds = useCallback(
    (value: any) => {
      let arr = value.map((item: any) => {
        if (item.isChecked) {
          return item.id;
        }
      });
      let arrr = arr.filter((item: any) => item);
      selectRowCheckbox && selectRowCheckbox(arrr);
    },
    [selectRowCheckbox],
  );

  const handleChange = useCallback(
    (value: any) => {
      const { name, checked } = value.target;
      if (name === "allSelect") {
        let ar = dataTable?.map((item: any) => {
          return { ...item, isChecked: checked };
        });
        setDataTable(ar);
        setIds(ar);
      } else {
        let ar = dataTable?.map((item: any, index: any) =>
          index.toString() === name ? { ...item, isChecked: checked } : item,
        );
        setDataTable(ar);
        setIds(ar);
      }
    },
    [setDataTable, dataTable, setIds],
  );

  if (!loading && (!data || data.length === 0)) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <span className="fs-5 fw-bold">Empty</span>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="table-wrapper">
      <table className="table table-striped table-bordered px-2" style={{ position: "relative" }}>
        <thead className="px-2">
          <tr>
            <th style={{ width: "40px" }}>
              {withCheckbox ? (
                <input
                  type="checkbox"
                  name="allSelect"
                  checked={
                    dataTable?.length > 0
                      ? !dataTable?.some((user: any) => user?.isChecked !== true)
                      : false
                  }
                  onChange={handleChange}
                />
              ) : (
                <span>#</span>
              )}
            </th>
            {headers.map((head: any, index: any) => {
              return (
                <th key={index} style={{ width: `${head.width}px` }}>
                  {searchHeader && !head.searchHidden && (
                    <input
                      type="text"
                      className="search-input"
                      placeholder={head.header}
                      onChange={(event) => searchHeader(event.target.value, head.access)}
                    />
                  )}
                  {(!searchHeader || head.searchHidden) && head.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {dataTable &&
            dataTable?.map((row: any, index: number) => {
              return (
                <tr key={index}>
                  <td style={{ width: "40px" }}>
                    {withCheckbox ? (
                      <input
                        type="checkbox"
                        name={index.toString()}
                        checked={row.isChecked || false}
                        onChange={handleChange}
                      />
                    ) : (
                      <span>{index + 1}.</span>
                    )}{" "}
                  </td>
                  {headers.map((head: any, i: number) => {
                    return (
                      <td key={i} width={`${head.width}px`}>
                        {head.ceil ? <div>{head.ceil(row)}</div> : <span>{row[head.access]}</span>}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
