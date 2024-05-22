import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { useCallback, useEffect, useState } from "react";
import { showError } from "../../utils/NotificationUtils";
import { useRegionApiContext } from "../../api/regions/RegionsApiContext";
import { useDistrictsApiContext } from "../../api/districts/DistrictsApiContext";
import { useProjectApiContext } from "../../api/projects/ProjectsApiContext";
import { useNumberOfOrdersApiContext } from "../../api/number-of-orders/NumberOfOrderApiContext";
import { ObjectFilter } from "../../filters/ObjectFilter";
import { GroupBox } from "../ui/GroupBox";
import { update } from "immupdate";
import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { noop } from "lodash";
import { toast } from "react-toastify";
import { useOjbectClassApiContext } from "../../api/object-class/ObjectClassApiContext";
import { useOjbectClassTypeApiContext } from "../../api/object-class-type/ObjectClassTypeApiContext";

import AddIcon from "../icons/AddIcon";
import Button, { BgColors } from "../ui/Button";
import CustomCard from "../ui/CustomCard";
import ObjectHeaderFilter from "./ObjectHeaderFilter";
import ObjectTable from "./ObjectTable";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import Loader from "../ui/Loader";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>();

  const [initialValues, setInitialValues] = useState({
    regionId: 0,
    districtId: 0,
    projectId: 0,
    numberOfOrderId: 0,
    objectClassificationId: 0,
    objectClassificationTypeId: 0,
  });

  const [filterValues, setFilterValues] = useState({
    regionId: 0,
    districtId: 0,
    projectId: 0,
    numberOfOrderId: 0,
    objectClassificationId: 0,
    objectClassificationTypeId: 0,
  });

  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [loadingFile, setLoadingFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isWithFilter, setIsWithFilter] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [regions, setRegions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [objectClassificationTypes, setOobjectClassificationTypes] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [districts, setDistricts] = useState([]);
  const [numberOfOrders, setNumberOfOrders] = useState([]);
  const [objectClassifications, setObjectClassifications] = useState([]);

  const navigate = useNavigate();
  const { translate } = useI18n();
  const { ObyektApi } = useObyektApiContext();
  const { RegionsApi } = useRegionApiContext();
  const { DistrictsApi } = useDistrictsApiContext();
  const { ProjectsApi } = useProjectApiContext();
  const { NumberOfOrdersApi } = useNumberOfOrdersApiContext();
  const { ObjectClassTypeApi } = useOjbectClassTypeApiContext();
  const { ObjectClassApi } = useOjbectClassApiContext();

  useEffect(() => {
    setLoading(true);
    ObyektApi.getObyekts({ ...filterValues, searchValue, ...filter.getPaginationQuery() })
      .then((r) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [ObyektApi, filterValues, searchValue, filter]);

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
        setOobjectClassificationTypes(_objectClassicationTypes);
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

      setInitialValues((prev: any) =>
        update(prev, {
          regionId: value,
          districtId: {
            label: "",
            value: "",
          },
        }),
      );

      setFilterValues((prev: any) =>
        update(prev, {
          regionId: value.value,
          districtId: 0,
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
              label: d.name,
              value: d.id,
            };
          });
          setNumberOfOrders(_numberOfOrders);
        })
        .catch(showError);

      setInitialValues((prev: any) =>
        update(prev, {
          projectId: value,
          numberOfOrderId: {
            label: "",
            value: "",
          },
        }),
      );

      setFilterValues((prev: any) =>
        update(prev, {
          projectId: value.value,
          numberOfOrderId: 0,
        }),
      );
    },
    [NumberOfOrdersApi],
  );

  const onChangeObjectClassType = useCallback(
    (value: any) => {
      ObjectClassApi.getObjectClasses({ objectClassTypeId: value.value })
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

      setInitialValues((prev: any) =>
        update(prev, {
          objectClassificationTypeId: value,
          objectClassificationId: {
            label: "",
            value: "",
          },
        }),
      );

      setFilterValues((prev: any) =>
        update(prev, {
          objectClassificationTypeId: value.value,
          objectClassificationId: 0,
        }),
      );
    },
    [ObjectClassApi],
  );

  const onChangeDistricts = useCallback((value: any) => {
    setInitialValues((prev: any) =>
      update(prev, {
        districtId: value,
      }),
    );

    setFilterValues((prev: any) =>
      update(prev, {
        districtId: value.value,
      }),
    );
  }, []);

  const onChangeNumberOfOrders = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          numberOfOrderId: value,
        }),
      );

      setFilterValues((prev: any) =>
        update(prev, {
          numberOfOrderId: value.value,
        }),
      );
    },
    [setInitialValues, setFilterValues],
  );

  const onChangeObjectClass = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          objectClassificationId: value,
        }),
      );

      setFilterValues((prev: any) =>
        update(prev, {
          objectClassificationId: value.value,
        }),
      );
    },
    [setInitialValues, setFilterValues],
  );

  return (
    <div className="w-100 p-4">
      {isWithFilter && (
        <CustomCard className="mt-3">
          <ObjectHeaderFilter
            initialValues={initialValues}
            regionsOptions={regions}
            projectsOptions={projects}
            districtsOptions={districts}
            numberOfOrdersOptions={numberOfOrders}
            objectClassificationsOptions={objectClassifications}
            objectClassificationsTypesOptions={objectClassificationTypes}
            onChangeRegion={onChangeRegion}
            onChangeProject={onChangeProject}
            onChangeDistricts={onChangeDistricts}
            onChangeObjectClass={onChangeObjectClass}
            onChangeNumberOfOrders={onChangeNumberOfOrders}
            onChangeObjectClassType={onChangeObjectClassType}
          />
        </CustomCard>
      )}
      <div className="d-flex align-items-center justify-content-between mt-3">
        <div className="d-flex">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Green}
            heigh="34px"
            icon={<AddIcon />}
            onClick={() =>
              navigate(
                `/dashboard/objects/object-form?formType=create&productFormType=1&objectFormType=1`,
              )
            }
          >
            {translate("ADD_BUTTON_TITLE")}
          </Button>
          <Button
            className="py-1 px-3 text-light ms-2"
            bgColor={BgColors.Navy}
            heigh="34px"
            onClick={() => setIsWithFilter(!isWithFilter)}
          >
            {isWithFilter ? "Hide Filter" : "Show Filter"}
          </Button>
        </div>
        <Formik initialValues={{ searchValue: "" }} onSubmit={noop}>
          {() => (
            <Form>
              <InputField
                name="searchValue"
                width={320}
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Seach..."
              />
            </Form>
          )}
        </Formik>
      </div>

      <CustomCard
        className="mt-3"
        style={{
          height: "76vh",
        }}
      >
        <ObjectTable
          loading={loading}
          data={data?.data}
          selectIds={setDeleteDocuments}
          readOnMap={(value) => navigate(`/dashboard/objects/object-view-on?objectId=${value}`)}
          downloadPdf={(value) => navigate(`/dashboard/objects/object-pdf-report?objectId=${value}`)}
          editObyekt={(value) => navigate(`/dashboard/objects/object-form?objectId=${value}`)}
          setOjectForProducts={(value) =>
            navigate(`/dashboard/objects/object-products?objectId=${value}`)
          }
          setOjectForView={(value) => navigate(`/dashboard/objects/object-view?objectId=${value}`)}
        />
      </CustomCard>
      <div className="d-flex justify-content-between align-items-center mt-4 pb-3">
        <Button
          disabled={!(deleteDocuments && deleteDocuments?.length > 0)}
          onClick={() => setDeleteModal(true)}
          className="py-2 px-2 text-light"
          bgColor={deleteDocuments && deleteDocuments?.length > 0 ? BgColors.Red : BgColors.White}
        >
          <DeleteIcon color={deleteDocuments && deleteDocuments?.length > 0 ? "#fff" : "#000"} />
        </Button>
        <Paginator
          filter={filter}
          totalPageCount={data?.totalPageCount}
          totalRowCount={data?.totalRowCount}
        />
      </div>
      <Modal
        show={deleteModal}
        closeHandler={() => setDeleteModal(false)}
        className="d-flex justify-content-center align-items-center"
        contentClassName="rounded p-4"
        width="500px"
      >
        <GroupBox>
          <YesOrNoModal
            title="REGION_TABLE_DELETE_REGIONS_MODAL_QUESTION"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  obyektIds: deleteDocuments,
                };
                ObyektApi.deleteObyekts(json)
                  .then((r) => {
                    toast.success(r?.data?.message);
                    window.location.reload();
                  })
                  .catch(showError);
              }
              setDeleteModal(false);
            }}
          />
        </GroupBox>
      </Modal>
      <Modal
        show={loadingFile}
        closeHandler={noop}
        className="d-flex justify-content-center align-items-center"
        contentClassName="rounded p-4"
        width="400px"
      >
        <div className="card text-center py-2">
          <h5>File is downloading...</h5>
          <Loader />
        </div>
      </Modal>
    </div>
  );
}
