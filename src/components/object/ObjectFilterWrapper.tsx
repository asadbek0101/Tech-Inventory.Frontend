import { useCallback, useEffect, useState } from "react";
import { useRegionApiContext } from "../../api/regions/RegionsApiContext";
import { useDistrictsApiContext } from "../../api/districts/DistrictsApiContext";
import { useProjectApiContext } from "../../api/projects/ProjectsApiContext";
import { useNumberOfOrdersApiContext } from "../../api/number-of-orders/NumberOfOrderApiContext";
import { useOjbectClassTypeApiContext } from "../../api/object-class-type/ObjectClassTypeApiContext";
import { useOjbectClassApiContext } from "../../api/object-class/ObjectClassApiContext";
import { showError } from "../../utils/NotificationUtils";
import { update } from "immupdate";

import ObjectFilter from "./ObjectFilter";

interface Props {
  readonly initialFilter: any;
  readonly setInitialFilter: (value: any) => void;
}

export default function ObjectFilterWrapper({ initialFilter, setInitialFilter }: Props) {
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [streets, setStreets] = useState([]);

  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);

  const [classTypes, setClassTypes] = useState([]);
  const [classes, setClasses] = useState([]);

  const { RegionsApi } = useRegionApiContext();
  const { DistrictsApi } = useDistrictsApiContext();

  const { ProjectsApi } = useProjectApiContext();
  const { NumberOfOrdersApi } = useNumberOfOrdersApiContext();

  const { ObjectClassTypeApi } = useOjbectClassTypeApiContext();
  const { ObjectClassApi } = useOjbectClassApiContext();

  useEffect(() => {
    RegionsApi.getRegionsList()
      .then((r) => {
        const _regions = r?.data?.map((item: any) => {
          return {
            label: item?.name,
            value: item?.id,
            center: [item?.lat, item?.lng],
            zoom: item?.zoom,
            id: item?.id,
          };
        });
        _regions.unshift({
          label: "Hammasi",
          value: 0,
          center: [41.834704258607715, 64.20046593138136],
          zoom: 7,
          id: 0,
        });
        setRegions(_regions);
      })
      .catch(showError);
  }, [RegionsApi]);

  useEffect(() => {
    ProjectsApi.getProjectsList()
      .then((r) => {
        const _projects = r?.data?.map((item: any) => {
          return {
            label: item?.name,
            value: item?.id,
          };
        });
        _projects.unshift({
          label: "Hammasi",
          value: 0,
        });
        setProjects(_projects);
      })
      .catch(showError);
  }, [ProjectsApi]);

  useEffect(() => {
    ObjectClassTypeApi.getObjectClassTypesList()
      .then((r) => {
        const _classTypes = r?.data?.map((item: any) => {
          return {
            label: item?.name,
            value: item?.id,
          };
        });
        _classTypes.unshift({
          label: "Hammasi",
          value: 0,
        });
        setClassTypes(_classTypes);
      })
      .catch(showError);
  }, [ObjectClassTypeApi]);

  const onChangeRegion = useCallback(
    (event: any) => {
      DistrictsApi.getDistrictsList({ regionId: event?.value })
        .then((r: any) => {
          const _districts = r?.data?.map((item: any) => {
            return {
              label: item?.name,
              value: item?.id,
            };
          });
          _districts.unshift({
            label: "Hammasi",
            value: 0,
          });
          setDistricts(_districts);
        })
        .catch(showError);

      setInitialFilter((prev: any) =>
        update(prev, {
          region: event,
          district: {
            label: "Hammasi",
            value: 0,
          },
          street: {
            label: "Hammasi",
            value: 0,
          },
        }),
      );
    },
    [DistrictsApi, setInitialFilter],
  );

  const onChangeDistrict = useCallback(
    (event: any) => {
      DistrictsApi.getStreetsList({ districtId: event?.value }).then((r: any) => {
        const _streets = r?.data?.map((item: any) => {
          return {
            label: item?.name,
            value: item?.id,
          };
        });
        _streets.unshift({
          label: "Hammasi",
          value: 0,
        });
        setStreets(_streets);
      });

      setInitialFilter((prev: any) =>
        update(prev, {
          district: event,
          street: {
            label: "Hammasi",
            value: 0,
          },
        }),
      );
    },
    [DistrictsApi, setInitialFilter],
  );

  const onChangeProject = useCallback(
    (event: any) => {
      NumberOfOrdersApi.getNumberOfOrdersList({ projectId: event?.value }).then((r: any) => {
        const _orders = r?.data?.map((item: any) => {
          return {
            label: item?.number,
            value: item?.id,
          };
        });
        _orders.unshift({
          label: "Hammasi",
          value: 0,
        });
        setOrders(_orders);
      });

      setInitialFilter((prev: any) =>
        update(prev, {
          project: event,
          order: {
            label: "Hammasi",
            value: 0,
          },
        }),
      );
    },
    [NumberOfOrdersApi],
  );

  const onChangeClassType = useCallback(
    (event: any) => {
      ObjectClassApi.getObjectClassesList({ objectClassTypeId: event?.value }).then((r: any) => {
        const _classses = r?.data?.map((item: any) => {
          return {
            label: item?.name,
            value: item?.id,
          };
        });
        _classses.unshift({
          label: "Hammasi",
          value: 0,
        });
        setClasses(_classses);
      });

      setInitialFilter((prev: any) =>
        update(prev, {
          classType: event,
          class: {
            label: "Hammasi",
            value: 0,
          },
        }),
      );
    },
    [ObjectClassApi],
  );

  return (
    <ObjectFilter
      regionsList={regions}
      districtsList={districts}
      streetsList={streets}
      projectsList={projects}
      ordersList={orders}
      classTypesList={classTypes}
      classesList={classes}
      initialFilter={initialFilter}
      setInitialFilter={setInitialFilter}
      onChangeRegion={onChangeRegion}
      onChangeDistrict={onChangeDistrict}
      onChangeProject={onChangeProject}
      onChangeClassType={onChangeClassType}
    />
  );
}
