import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { SelectPickerField } from "../form/SelectPrickerField";
import { noop } from "lodash";

interface Props {
  readonly initialValues: any;
  readonly regionsOptions: any;
  readonly districtsOptions: any;
  readonly projectsOptions: any;
  readonly numberOfOrdersOptions: any;
  readonly objectClassificationsTypesOptions: any;
  readonly objectClassificationsOptions: any;
  readonly onChangeRegion: (value: any) => void;
  readonly onChangeProject: (value: any) => void;
  readonly onChangeDistricts: (value: any) => void;
  readonly onChangeObjectClass: (value: any) => void;
  readonly onChangeNumberOfOrders: (value: any) => void;
  readonly onChangeObjectClassType: (value: any) => void;
}

export default function ObjectHeaderFilter({
  initialValues,
  regionsOptions,
  districtsOptions,
  projectsOptions,
  numberOfOrdersOptions,
  objectClassificationsOptions,
  objectClassificationsTypesOptions,
  onChangeRegion,
  onChangeProject,
  onChangeDistricts,
  onChangeObjectClass,
  onChangeNumberOfOrders,
  onChangeObjectClassType,
}: Props) {
  return (
    <Formik initialValues={initialValues} onSubmit={noop} enableReinitialize={true}>
      {() => (
        <Form>
          <div className="row p-3">
            <div className="col-12">
              <GroupBox title="Filter">
                <div className="row">
                  <div className="col-4">
                    <SelectPickerField
                      name="regionId"
                      label="OBJECT_FORM_REGION_NAME_FIELD_TITLE"
                      options={regionsOptions}
                      onChanges={onChangeRegion}
                    />
                  </div>
                  <div className="col-4"> 
                    <SelectPickerField
                      name="projectId"
                      label="OBJECT_FORM_PROEJCT_NAME_FIELD_TITLE"
                      options={projectsOptions}
                      onChanges={onChangeProject}
                    />
                  </div>
                  <div className="col-4">
                    <SelectPickerField
                      name="objectClassificationTypeId"
                      label="OBJECT_FORM_OBJECT_CLASS_TYPE_FIELD_TITLE"
                      options={objectClassificationsTypesOptions}
                      onChanges={onChangeObjectClassType}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <SelectPickerField
                      name="districtId"
                      label="OBJECT_FORM_DISTRICT_NAME_FIELD_TITLE"
                      options={districtsOptions}
                      onChanges={onChangeDistricts}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <SelectPickerField
                      name="numberOfOrderId"
                      label="OBJECT_FORM_NUMBER_OF_ORDER_FIELD_TITLE"
                      options={numberOfOrdersOptions}
                      onChanges={onChangeNumberOfOrders}
                    />
                  </div>

                  <div className="col-4 mt-3">
                    <SelectPickerField
                      name="objectClassificationId"
                      label="OBJECT_FORM_OBJECT_CLASS_FIELD_TITLE"
                      options={objectClassificationsOptions}
                      onChanges={onChangeObjectClass}
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
