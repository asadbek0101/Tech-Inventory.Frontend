import { Form, Formik } from "formik";
import { noop } from "lodash";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";

import FileDownload from "../ui/FileDownload";
import { ConnectionTypes } from "../../api/obyekt/ObyektDto";

interface Props {
  readonly initialValues: any;
  readonly attachments?: any[];
  readonly setPath: (value: any) => void;
}

export default function ObjectView({ initialValues, attachments, setPath }: Props) {
  return (
    <Formik initialValues={initialValues} onSubmit={noop} enableReinitialize={true}>
      {() => (
        <Form>
          <div className="row p-4">
            <div className="col-4">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <InputField
                      name="region"
                      label="OBJECT_FORM_REGION_NAME_FIELD_TITLE"
                      disabled
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="district"
                      label="OBJECT_FORM_DISTRICT_NAME_FIELD_TITLE"
                      disabled
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-4">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <InputField
                      name="project"
                      label="OBJECT_FORM_PROEJCT_NAME_FIELD_TITLE"
                      disabled
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="numberOfOrder"
                      label="OBJECT_FORM_NUMBER_OF_ORDER_FIELD_TITLE"
                      disabled
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-4">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <InputField
                      name="objectClassType"
                      label="OBJECT_FORM_OBJECT_CLASS_TYPE_FIELD_TITLE"
                      disabled
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="objectClass"
                      label="OBJECT_FORM_OBJECT_CLASS_FIELD_TITLE"
                      disabled
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-12 mt-4">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <InputField name="nameAndAddress" label="Obyekt nomi va manzili" disabled />
                  </div>

                  <div className="col-4 mt-3">
                    <InputField name="latitude" label="OBJECT_FORM_LATITUDE_FIELD_TITLE" disabled />
                  </div>
                  <div className="col-4 mt-3">
                    <InputField
                      name="longitude"
                      label="OBJECT_FORM_LONGITUDE_FIELD_TITLE"
                      disabled
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <InputField name="connectionType" label="Ulanish turi" disabled />
                  </div>
                </div>
              </GroupBox>
            </div>
            {initialValues.connectionType && (
              <div className="col-12 mt-4">
                <GroupBox title={`Aloqa tarmog'i (${initialValues?.connectionType})`}>
                  <div className="row">
                    {(initialValues?.connectionTypeId === ConnectionTypes.GPON ||
                      initialValues?.connectionTypeId === ConnectionTypes.FTTX) && (
                      <div className="col-4">
                        <InputField name="model" label="Model" disabled />
                      </div>
                    )}
                    {initialValues?.connectionTypeId === ConnectionTypes.GPON && (
                      <div className="col-4">
                        <InputField
                          name="serialNumber"
                          label="Seria raqami"
                          value={initialValues?.serialNumber}
                          disabled
                        />
                      </div>
                    )}
                    {(initialValues?.connectionTypeId === ConnectionTypes.GPON ||
                      initialValues?.connectionTypeId === ConnectionTypes.FTTX) && (
                      <div className="col-4">
                        <InputField
                          name="numberOfPort"
                          label="Port raqami"
                          value={initialValues.numberOfPort}
                          disabled
                        />
                      </div>
                    )}
                    {initialValues?.connectionTypeId === ConnectionTypes.GSM && (
                      <div className="col-4">
                        <InputField
                          name="phoneNumber"
                          label="Telefon raqami"
                          value={initialValues.phoneNumber}
                          disabled
                        />
                      </div>
                    )}
                  </div>
                </GroupBox>
              </div>
            )}
            <div className="row my-4">
              {attachments &&
                attachments.map((p: any) => {
                  return (
                    <div className="col-2">
                      <FileDownload
                        onClick={() => setPath(p)}
                        title={`${p.fileName} \n (Yuklash)`}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
