import { Form, Formik } from "formik";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";
import { update } from "immupdate";
import { useCallback } from "react";
import { InputField } from "../form/InputField";

interface Props {
  readonly regionsList: any[];
  readonly districtsList: any[];
  readonly streetsList: any[];

  readonly projectsList: any[];
  readonly ordersList: any[];

  readonly classTypesList: any[];
  readonly classesList: any[];

  readonly initialFilter: any;
  readonly setInitialFilter: (value: any) => void;

  readonly onChangeRegion: (value: any) => void;
  readonly onChangeDistrict: (value: any) => void;

  readonly onChangeProject: (value: any) => void;

  readonly onChangeClassType: (value: any) => void;
}

export default function ObjectFilter({
  regionsList,
  districtsList,
  streetsList,

  projectsList,
  ordersList,

  classTypesList,
  classesList,

  initialFilter,
  setInitialFilter,

  onChangeRegion,
  onChangeDistrict,
  onChangeProject,
  onChangeClassType,
}: Props) {
  const onChangeStreet = useCallback(
    (event: any) => {
      setInitialFilter((prev: any) =>
        update(prev, {
          street: event,
        }),
      );
    },
    [setInitialFilter],
  );

  const onChangeOrder = useCallback(
    (event: any) => {
      setInitialFilter((prev: any) =>
        update(prev, {
          order: event,
        }),
      );
    },
    [setInitialFilter],
  );

  const onChangeClass = useCallback(
    (event: any) => {
      setInitialFilter((prev: any) =>
        update(prev, {
          class: event,
        }),
      );
    },
    [setInitialFilter],
  );

  const onChangeSearchValue = useCallback(
    (event: any) => {
      setInitialFilter((prev: any) =>
        update(prev, {
          searchValue: event?.target?.value,
        }),
      );
    },
    [setInitialFilter],
  );

  return (
    <div className="locations-tab-sidebar">
      <div className="locations-search-tab">
        <Formik initialValues={initialFilter} enableReinitialize={true} onSubmit={noop}>
          <Form className="d-flex gap-4">
            <SelectPickerField
              width={220}
              name="region"
              onChanges={onChangeRegion}
              options={regionsList}
              value={initialFilter?.region}
            />
            <SelectPickerField
              width={220}
              name="district"
              options={districtsList}
              onChanges={onChangeDistrict}
              value={initialFilter?.district}
            />

            <SelectPickerField
              width={220}
              name="street"
              options={streetsList}
              onChanges={onChangeStreet}
              value={initialFilter?.street}
            />

            <SelectPickerField
              width={220}
              name="project"
              onChanges={onChangeProject}
              options={projectsList}
              value={initialFilter?._projects}
            />
            <SelectPickerField
              width={220}
              name="order"
              options={ordersList}
              onChanges={onChangeOrder}
              value={initialFilter.order}
            />
            <SelectPickerField
              width={220}
              name="classType"
              onChanges={onChangeClassType}
              options={classTypesList}
              value={initialFilter?.classType}
            />
            <SelectPickerField
              width={220}
              name="class"
              options={classesList}
              onChanges={onChangeClass}
              value={initialFilter?.class}
            />
            <InputField
              width={300}
              name="searchValue"
              placeholder="Qidirishi..."
              onChange={onChangeSearchValue}
              value={initialFilter?.searchValue}
            />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
