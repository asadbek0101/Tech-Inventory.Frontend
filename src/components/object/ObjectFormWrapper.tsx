import { useCallback, useEffect, useMemo, useState } from "react";
import Button, { BgColors } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { useRegionApiContext } from "../../api/regions/RegionsApiContext";
import { useDistrictsApiContext } from "../../api/districts/DistrictsApiContext";
import { useProjectApiContext } from "../../api/projects/ProjectsApiContext";
import { useNumberOfOrdersApiContext } from "../../api/number-of-orders/NumberOfOrderApiContext";
import { update } from "immupdate";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { toast } from "react-toastify";
import { showError } from "../../utils/NotificationUtils";
import { ObjectFilter, ObjectFilterTabs, ObjectFormTypes } from "../../filters/ObjectFilter";
import { useOjbectClassApiContext } from "../../api/object-class/ObjectClassApiContext";
import { useModelsApiContext } from "../../api/models/ModelsApiContext";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { ModelTypes } from "../../api/models/ModelsDto";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { tokenSelector, userIdSelector } from "../../reducers/authReducer";
import { API_HOST } from "../../constants/AppConstants";
import { useOjbectClassTypeApiContext } from "../../api/object-class-type/ObjectClassTypeApiContext";

import axios from "axios";
import TabPage from "../tabs/TabPage";
import ObjectForm from "./ObjectForm";
import useLocationHelpers from "../../hooks/userLocationHelpers";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectFormWrapper({ filter }: Props) {
  const [initialValues, setInitalValues] = useState({
    regionId: 0,
    districtId: 0,
    projectId: 0,
    numberOfOrderId: 0,
    objectClassId: 0,
    objectClassTypeId: 0,
    modelId: 0,
    connectionType: "",
    files: [],
    name: "",
    home: "",
    street: "",
    latitude: "",
    longitude: "",
    info: "",
    serialNumber: "",
    numberOfPort: "",
    phoneNumber: "",
  });

  const [models, setModels] = useState<SelectPickerOptionsProps[]>([]);

  const [regions, setRegions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [obClassTypes, setObClassTypes] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [numberOfOrders, setNumberOfOrders] = useState([]);
  const [objectClassifications, setObjectClassifications] = useState([]);

  const { translate } = useI18n();

  const { ObyektApi } = useObyektApiContext();
  const { RegionsApi } = useRegionApiContext();
  const { DistrictsApi } = useDistrictsApiContext();
  const { ProjectsApi } = useProjectApiContext();
  const { NumberOfOrdersApi } = useNumberOfOrdersApiContext();
  const { ObjectClassTypeApi } = useOjbectClassTypeApiContext();
  const { ObjectClassApi } = useOjbectClassApiContext();
  const { ModelsApi } = useModelsApiContext();

  const locationHelpers = useLocationHelpers();
  const objectId = useMemo(() => Number(filter.getObyektId()) || 0, [filter]);

  const token = useShallowEqualSelector(tokenSelector);
  const userId = useShallowEqualSelector(userIdSelector);

  useEffect(() => {}, [ModelsApi]);

  const objectFormType: ObjectFormTypes = useMemo(
    () => filter.getOjbectFormType() || ObjectFormTypes.WithoutProductForm,
    [filter],
  );

  useEffect(() => {
    if (objectId !== 0) {
      ObyektApi.getOneObyekt({ id: Number(objectId) })
        .then((r) => {
          if (r?.data?.regionId) {
            DistrictsApi.getDistrictsList({ regionId: r?.data?.regionId })
              .then((r) => {
                const _districts = r?.data?.map((d: any) => {
                  return {
                    label: d.name,
                    value: d.id,
                  };
                });
                setDistricts(_districts);
              })
              .catch(showError);
          }

          if (r?.data?.projectId) {
            NumberOfOrdersApi.getNumberOfOrdersList({ projectId: r?.data?.projectId })
              .then((r) => {
                const _numberOfOrders = r?.data?.map((d: any) => {
                  return {
                    label: d.number,
                    value: d.id,
                  };
                });
                setNumberOfOrders(_numberOfOrders);
              })
              .catch(showError);
          }

          if (r?.data?.objectClassTypeId) {
            ObjectClassApi.getObjectClassesList({ objectClassTypeId: r?.data?.objectClassTypeId })
              .then((r) => {
                const _objectClassifications = r?.data?.map((d: any) => {
                  return {
                    label: d.name,
                    value: d.id,
                  };
                });
                setObjectClassifications(_objectClassifications);
              })
              .catch(showError);
          }

          const ob = {
            ...r?.data,
            regionId: {
              label: r?.data?.region,
              value: r?.data?.regionId,
            },
            districtId: {
              label: r?.data?.district,
              value: r?.data?.districtId,
            },
            projectId: {
              label: r?.data?.project,
              value: r?.data?.projectId,
            },
            numberOfOrderId: {
              label: r?.data?.numberOfOrder,
              value: r?.data?.numberOfOrderId,
            },
            objectClassId: {
              label: r?.data?.objectClass,
              value: r?.data?.objectClassId,
            },
            objectClassTypeId: {
              label: r?.data?.objectClassType,
              value: r?.data?.objectClassTypeId,
            },
            connectionType: {
              label: r?.data?.connectionType,
              value: r?.data?.connectionTypeId,
            },
            modelId: {
              label: r?.data?.model,
              value: r?.data?.modelId,
            },
            files: r?.data?.files || [],
          };
          setInitalValues(ob);
        })
        .catch(showError);
    }
  }, [ObyektApi, DistrictsApi, RegionsApi, ObjectClassTypeApi, objectId]);

  useEffect(() => {
    RegionsApi.getRegionsList()
      .then((r) => {
        const _regions = r?.data?.map((region: any) => {
          return {
            label: region.name,
            value: region.id,
          };
        });
        setRegions(_regions);
      })
      .catch(showError);

    ProjectsApi.getProjectsList()
      .then((r) => {
        const _projects = r?.data?.map((region: any) => {
          return {
            label: region.name,
            value: region.id,
          };
        });
        setProjects(_projects);
      })
      .catch(showError);

    ObjectClassTypeApi.getObjectClassTypesList()
      .then((r) => {
        const _objectClassicationTypes = r?.data?.map((region: any) => {
          return {
            label: region.name,
            value: region.id,
          };
        });
        setObClassTypes(_objectClassicationTypes);
      })
      .catch(showError);
  }, [RegionsApi, ObjectClassApi, ProjectsApi]);

  const onChangeRegion = useCallback(
    (value: any) => {
      DistrictsApi.getDistrictsList({ regionId: value.value })
        .then((r) => {
          const _districts = r?.data?.map((d: any) => {
            return {
              label: d.name,
              value: d.id,
            };
          });
          setDistricts(_districts);
        })
        .catch(showError);

      setInitalValues((prev: any) =>
        update(prev, {
          regionId: value,
          districtId: {
            label: "",
            value: "",
          },
        }),
      );
    },
    [DistrictsApi],
  );

  const onChangeProject = useCallback(
    (value: any) => {
      NumberOfOrdersApi.getNumberOfOrdersList({ projectId: value.value })
        .then((r) => {
          const _numberOfOrders = r?.data?.map((d: any) => {
            return {
              label: d.number,
              value: d.id,
            };
          });
          setNumberOfOrders(_numberOfOrders);
        })
        .catch(showError);

      setInitalValues((prev: any) =>
        update(prev, {
          projectId: value,
          numberOfOrderId: {
            label: "",
            value: "",
          },
        }),
      );
    },
    [NumberOfOrdersApi],
  );

  const onChangeObjectClassType = useCallback(
    (value: any) => {
      ObjectClassApi.getObjectClassesList({ objectClassTypeId: value.value })
        .then((r) => {
          const _objectClassifications = r?.data?.map((d: any) => {
            return {
              label: d.name,
              value: d.id,
            };
          });
          setObjectClassifications(_objectClassifications);
        })
        .catch(showError);

      setInitalValues((prev: any) =>
        update(prev, {
          objectClassTypeId: value,
          objectClassId: {
            label: "",
            value: "",
          },
        }),
      );
    },
    [ObjectClassApi],
  );

  const onSubmit = useCallback(
    (value: any) => {
      if (objectId) {
        // Update METHOD
        const json = {
          ...value,
          id: objectId,
          regionId: value?.regionId?.value,
          districtId: value?.districtId?.value,
          projectId: value?.projectId?.value,
          numberOfOrderId: value?.numberOfOrderId?.value,
          objectClassId: value?.objectClassId?.value,
          objectClassTypeId: value?.objectClassTypeId?.value,
          connectionType: value?.connectionType?.value,
        };

        ObyektApi.updateObyekt(json)
          .then((r) => {
            const files = initialValues?.files;
            files &&
              files.map((file: any) => {
                if (file && Boolean(file?.file?.type)) {
                  const url = `${API_HOST}Attachments/Create?objectId=${r?.data?.id}&originalFileName=${file.originalFileName}`;
                  const formData = new FormData();
                  formData.append("File", file?.file);
                  const config = {
                    headers: {
                      "content-type": "multipart/form-data",
                      Authorization: `Bearer ${token}`,
                      userId: `${userId}`,
                    },
                  };
                  axios
                    .post(url, formData, config)
                    .then((response: any) => {
                      toast.success(response?.data);
                    })
                    .catch(showError);
                } else {
                  const json = {
                    ...file,
                  };
                  ObyektApi.updateAttachment(json)
                    .then((r) => console.log(r))
                    .catch(showError);
                }
              });

            const updateConnectionType = {
              obyektId: r?.data?.id,
              modelId: value?.modelId?.value,
              numberOfPort: value?.numberOfPort,
              serialNumber: value?.serialNumber,
              phoneNumber: value?.phoneNumber,
              type: value?.connectionType?.value,
            };

            ObyektApi.updateConnectionType(updateConnectionType)
              .then((r) => toast.success(r?.data?.message))
              .catch(showError);

            toast.success(r?.data?.message);
            locationHelpers.pushQuery({ tab: ObjectFilterTabs.ObjectView, objectId: r?.data?.id });
          })
          .catch(showError);
      } else {
        // Create METHOD
        const json = {
          ...value,
          regionId: value?.regionId?.value,
          districtId: value?.districtId?.value,
          projectId: value?.projectId?.value,
          numberOfOrderId: value?.numberOfOrderId?.value,
          objectClassId: value?.objectClassId?.value,
          objectClassTypeId: value?.objectClassTypeId?.value,
          connectionType: value?.connectionType?.value,
        };
        ObyektApi.createObyekt(json)
          .then((r) => {
            if (r?.data?.id) {
              const files = initialValues?.files;
              files &&
                files.map((file: any) => {
                  if (file && Boolean(file?.file?.type)) {
                    const url = `${API_HOST}Attachments/Create?objectId=${r?.data?.id}&originalFileName=${file.originalFileName}`;
                    const formData = new FormData();
                    formData.append("File", file?.file);
                    const config = {
                      headers: {
                        "content-type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                        userId: `${userId}`,
                      },
                    };
                    axios
                      .post(url, formData, config)
                      .then((response: any) => {
                        toast.success(response?.data);
                      })
                      .catch(showError);
                  }
                });
            }

            const createConnectionType = {
              obyektId: r?.data?.id,
              modelId: value?.modelId?.value,
              numberOfPort: value?.numberOfPort,
              serialNumber: value?.serialNumber,
              phoneNumber: value?.phoneNumber,
              type: value?.connectionType?.value,
            };

            ObyektApi.createConnectionType(createConnectionType)
              .then((r) => toast.success(r?.data?.message))
              .catch(showError);

            toast.success(r?.data?.message);
            locationHelpers.pushQuery({ tab: ObjectFilterTabs.ObjectView, objectId: r?.data?.id });
          })
          .catch(showError);
      }
    },
    [ObyektApi, locationHelpers, objectId, initialValues.files],
  );

  const setConnectionType = useCallback(
    (value: any) => {
      if (value?.label === "FTTX") {
        ModelsApi.getModelsList({ type: ModelTypes.FTTX })
          .then((r) => {
            const _models = r?.data.map((sw: any) => {
              return {
                label: sw.name,
                value: sw.id,
              };
            });
            setModels(_models);
          })
          .catch(showError);
      } else if (value?.label === "GPON") {
        ModelsApi.getModelsList({ type: ModelTypes.GPON })
          .then((r) => {
            const _models = r?.data.map((sw: any) => {
              return {
                label: sw.name,
                value: sw.id,
              };
            });
            setModels(_models);
          })
          .catch(showError);
      }
    },
    [ModelsApi],
  );

  const deleteFileFromDb = useCallback(
    (value: any) => {
      if (objectId) {
        ObyektApi.deleteFile({ id: value.id })
          .then((r) => toast.success(r?.message))
          .catch(showError);
      }
    },
    [ObyektApi, objectId],
  );

  return (
    <TabPage
      footerClassName="d-none"
      headerComponent={
        <Button
          className=" px-3 text-light"
          bgColor={BgColors.Yellow}
          heigh="34px"
          onClick={() =>
            locationHelpers.pushQuery({ tab: ObjectFilterTabs.ObjectTable, objectId: 0 })
          }
        >
          {translate("BACK_BUTTON_TITLE")}
        </Button>
      }
    >
      <div className="fs-5 fw-bold px-4 pt-3">Obyekt</div>
      <ObjectForm
        models={models}
        onSubmit={onSubmit}
        regionsOptions={regions}
        districtsOptions={districts}
        projectsOptions={projects}
        numberOfOrdersOptions={numberOfOrders}
        initialValues={initialValues}
        setInitialValues={setInitalValues}
        deleteFileFromDb={deleteFileFromDb}
        objectClassificationsTypesOptions={obClassTypes}
        objectClassificationsOptions={objectClassifications}
        onChangeRegion={onChangeRegion}
        onChangeProject={onChangeProject}
        setConnectionType={setConnectionType}
        onChangeObjectClassType={onChangeObjectClassType}
        formType={objectFormType}
      />
    </TabPage>
  );
}
