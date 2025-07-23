import "./assets/locations.scss";

import { useCallback } from "react";
import { SelectPickerField } from "../form/SelectPrickerField";
import { Form, Formik } from "formik";
import { noop } from "lodash";
import { update } from "immupdate";

import LeafletMapForMarkers from "../map/LeafletMapForMarkers";

interface Props {
  readonly markerList: any[];

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

  readonly center: [number, number];
  readonly zoom: number;
}

export default function LocationsTabLayout({
  markerList,

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

  center,
  zoom,
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

  return (
    <div className="locations-tab-layout">
      <LeafletMapForMarkers markerList={markerList} center={center} zoom={zoom} />
      <div className="locations-tab-sidebar">
        <div className="locations-regions">
          <Formik initialValues={initialFilter} onSubmit={noop}>
            <Form>
              <SelectPickerField
                label="Viloyat"
                name="region"
                onChanges={onChangeRegion}
                options={regionsList}
                value={initialFilter?.region}
              />
              {Boolean(initialFilter?.region && initialFilter?.region?.value != 0) && (
                <SelectPickerField
                  label="Tuman"
                  className="mt-3"
                  name="distirct"
                  options={districtsList}
                  onChanges={onChangeDistrict}
                  value={initialFilter?.distirct}
                />
              )}
              {Boolean(initialFilter?.district && initialFilter?.district?.value != 0) && (
                <SelectPickerField
                  label="Mahalla"
                  className="mt-3"
                  name="street"
                  options={streetsList}
                  onChanges={onChangeStreet}
                  value={initialFilter?.street}
                />
              )}
            </Form>
          </Formik>
        </div>
        <div className="locations-projects mt-3">
          <Formik initialValues={initialFilter} onSubmit={noop}>
            <Form>
              <SelectPickerField
                label="Loyiha"
                name="project"
                onChanges={onChangeProject}
                options={projectsList}
                value={initialFilter?._projects}
              />
              {Boolean(initialFilter?.project && initialFilter?.project?.value != 0) && (
                <SelectPickerField
                  label="Buyurtma raqami"
                  className="mt-3"
                  name="order"
                  options={ordersList}
                  onChanges={onChangeOrder}
                  value={initialFilter?.order}
                />
              )}
            </Form>
          </Formik>
        </div>
        <div className="locations-classifications mt-3">
          <Formik initialValues={initialFilter} onSubmit={noop}>
            <Form>
              <SelectPickerField
                label="Tasnif turi"
                name="classType"
                onChanges={onChangeClassType}
                options={classTypesList}
                value={initialFilter?.classType}
              />
              {Boolean(initialFilter?.classType && initialFilter?.classType?.value != 0) && (
                <SelectPickerField
                  label="Tasnif"
                  className="mt-3"
                  name="class"
                  options={classesList}
                  onChanges={onChangeClass}
                  value={initialFilter?.class}
                />
              )}
            </Form>
          </Formik>
        </div>
      </div>
      <div className="total-count-card">Umumiy: {markerList && markerList?.length}</div>
    </div>
  );
}
