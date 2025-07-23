import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { SelectPickerField } from "../form/SelectPrickerField";
import { InputField } from "../form/InputField";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback } from "react";
import { update } from "immupdate";
import { object, string } from "yup";
import { ObjectFormTypes } from "../../filters/ObjectFilter";
import { connectionTypes } from "../../constants/AppConstants";
import { ConnectionTypes } from "../../api/obyekt/ObyektDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { formatLocationNumber, formatPhoneNumber } from "../../utils/FormatUtils";
import { noop } from "lodash";

import DeleteIcon from "../icons/DeleteIcon";
import ImgUpload from "../ui/ImgUpload";

interface Props {
  readonly initialValues: any;
  readonly regionsOptions: any[];
  readonly districtsOptions: any[];
  readonly streetsOptions: any[];
  readonly numberOfOrdersOptions: any[];
  readonly projectsOptions: any[];
  readonly objectClassificationsOptions: any[];
  readonly objectClassificationsTypesOptions: any[];
  readonly deleteFileFromDb: (value: any) => void;
  readonly onChangeRegion: (value: any) => void;
  readonly onChangeDistrict: (value: any) => void;
  readonly onChangeProject: (value: any) => void;
  readonly setInitialValues: (value: any) => void;
  readonly setConnectionType: (value: any) => void;
  readonly onChangeObjectClassType: (value: any) => void;
  readonly formType?: ObjectFormTypes;
  readonly models: SelectPickerOptionsProps[];
}

const validationSchema = object({
  regionId: object().required(),
  districtId: object().required(),
  projectId: object().required(),
  numberOfOrderId: object().required(),
  objectClassTypeId: object().required(),
  objectClassId: object().required(),
  nameAndAddress: string().required("Required!"),
  latitude: string().required("Required!"),
  longitude: string().required("Required!"),
});

export default function ObjectForm({
  setInitialValues,
  onChangeRegion,
  onChangeDistrict,
  onChangeProject,
  onChangeObjectClassType,
  setConnectionType,
  deleteFileFromDb,
  initialValues,
  regionsOptions,
  districtsOptions,
  streetsOptions,
  numberOfOrdersOptions,
  projectsOptions,
  objectClassificationsOptions,
  objectClassificationsTypesOptions,
  models,
}: Props) {
  const onChangeStreet = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          streetId: value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeNumberOfOrder = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          numberOfOrderId: value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeObjectClassification = useCallback(
    (value: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          objectClassId: value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeNameAndAddress = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          nameAndAddress: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeLatitude = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          latitude: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeLongitude = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          longitude: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeSerialNumber = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          serialNumber: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeNumberOfPort = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          numberOfPort: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangePhoneNumber = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          phoneNumber: event.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onBlurPhoneNumber = useCallback(
    (event: any) => {
      const str = formatPhoneNumber(event?.target?.value);
      setInitialValues((prev: any) =>
        update(prev, {
          phoneNumber: str,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeConnectionType = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          connectionType: event,
          model: "",
        }),
      );
      setConnectionType(event);
    },
    [setInitialValues, setConnectionType],
  );

  const onChangeModelId = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          modelId: event,
        }),
      );
    },
    [setInitialValues],
  );

  const deleteFile = useCallback(
    (file: any, index: number) => {
      const files = [...initialValues.files];
      files.splice(index, 1);

      deleteFileFromDb(file);

      setInitialValues((prev: any) =>
        update(prev, {
          files: files,
        }),
      );
    },
    [setInitialValues, initialValues, deleteFileFromDb],
  );

  const addFile = useCallback(() => {
    const files = [...initialValues.files];

    const file = {
      file: "",
      originalFileName: "",
    };

    files.push(file);
    setInitialValues((prev: any) =>
      update(prev, {
        files: files,
      }),
    );
  }, [initialValues.files]);

  const onChangeFileName = useCallback(
    (event: any, index: number) => {
      const files = [...initialValues.files];
      files[index].originalFileName = event.target.value;
      setInitialValues((prev: any) =>
        update(prev, {
          files: files,
        }),
      );
    },
    [setInitialValues, initialValues.files],
  );

  const onChangeFile = useCallback(
    (event: any, index: number) => {
      const files = [...initialValues.files];
      files[index].file = event.target.files[0];
      setInitialValues((prev: any) =>
        update(prev, {
          files: files,
        }),
      );
    },
    [setInitialValues, initialValues.files],
  );

  const onBlurLong = useCallback(
    (event: any) => {
      const str = formatLocationNumber(event?.target?.value);
      setInitialValues((prev: any) =>
        update(prev, {
          longitude: str,
        }),
      );
    },
    [initialValues?.longitude],
  );

  const onBlurLat = useCallback(
    (event: any) => {
      const str = formatLocationNumber(event?.target?.value);
      setInitialValues((prev: any) =>
        update(prev, {
          latitude: str,
        }),
      );
    },
    [initialValues?.latitude],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={noop}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <div className="row p-4">
            <div>Obyekt</div>
            <div className="col-4 mt-2">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <SelectPickerField
                      name="regionId"
                      label="OBJECT_FORM_REGION_NAME_FIELD_TITLE"
                      options={regionsOptions}
                      onChanges={onChangeRegion}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <SelectPickerField
                      name="districtId"
                      label="OBJECT_FORM_DISTRICT_NAME_FIELD_TITLE"
                      options={districtsOptions}
                      onChanges={onChangeDistrict}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <SelectPickerField
                      name="streetId"
                      label="OBJECT_FORM_STREET_NAME_FIELD_TITLE"
                      options={streetsOptions}
                      onChanges={onChangeStreet}
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-4 mt-2">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <SelectPickerField
                      name="projectId"
                      label="OBJECT_FORM_PROEJCT_NAME_FIELD_TITLE"
                      options={projectsOptions}
                      onChanges={onChangeProject}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <SelectPickerField
                      name="numberOfOrderId"
                      label="OBJECT_FORM_NUMBER_OF_ORDER_FIELD_TITLE"
                      options={numberOfOrdersOptions}
                      onChanges={onChangeNumberOfOrder}
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-4 mt-2">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <SelectPickerField
                      name="objectClassTypeId"
                      label="OBJECT_FORM_OBJECT_CLASS_TYPE_FIELD_TITLE"
                      options={objectClassificationsTypesOptions}
                      onChanges={onChangeObjectClassType}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <SelectPickerField
                      name="objectClassId"
                      label="OBJECT_FORM_OBJECT_CLASS_FIELD_TITLE"
                      options={objectClassificationsOptions}
                      onChanges={onChangeObjectClassification}
                    />
                  </div>
                </div>
              </GroupBox>
            </div>
            <div className="col-12 mt-4">
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <InputField
                      name="nameAndAddress"
                      label="Obyekt nomi va manzili"
                      onChange={onChangeNameAndAddress}
                      value={initialValues?.nameAndAddress}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <InputField
                      name="latitude"
                      label="OBJECT_FORM_LATITUDE_FIELD_TITLE"
                      onChange={onChangeLatitude}
                      value={initialValues.latitude}
                      onBlur={onBlurLat}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <InputField
                      name="longitude"
                      label="OBJECT_FORM_LONGITUDE_FIELD_TITLE"
                      onChange={onChangeLongitude}
                      value={initialValues.longitude}
                      onBlur={onBlurLong}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <SelectPickerField
                      name="connectionType"
                      label="Ulanish turi"
                      options={connectionTypes}
                      onChanges={onChangeConnectionType}
                    />
                  </div>
                </div>
              </GroupBox>
            </div>

            {initialValues.connectionType && (
              <div className="col-12 mt-4">
                <GroupBox title={`Aloqa tarmog'i (${initialValues?.connectionType?.label})`}>
                  <div className="row">
                    {(initialValues?.connectionType?.value === ConnectionTypes.GPON ||
                      initialValues?.connectionType?.value === ConnectionTypes.FTTX) && (
                      <div className="col-4">
                        <SelectPickerField
                          name="modelId"
                          label="Model"
                          options={models}
                          onChanges={onChangeModelId}
                        />
                      </div>
                    )}
                    {initialValues?.connectionType?.value === ConnectionTypes.GPON && (
                      <div className="col-4">
                        <InputField
                          name="serialNumber"
                          label="Seria raqami"
                          onChange={onChangeSerialNumber}
                          value={initialValues?.serialNumber}
                        />
                      </div>
                    )}
                    {(initialValues?.connectionType?.value === ConnectionTypes.GPON ||
                      initialValues?.connectionType?.value === ConnectionTypes.FTTX) && (
                      <div className="col-4">
                        <InputField
                          name="numberOfPort"
                          label="Port raqami"
                          onChange={onChangeNumberOfPort}
                          value={initialValues.numberOfPort}
                        />
                      </div>
                    )}
                    {initialValues?.connectionType?.value === ConnectionTypes.GSM && (
                      <div className="col-4">
                        <InputField
                          name="phoneNumber"
                          label="Telefon raqami"
                          onChange={onChangePhoneNumber}
                          value={initialValues.phoneNumber}
                          onBlur={onBlurPhoneNumber}
                        />
                      </div>
                    )}
                    <div className="col-4"></div>
                  </div>
                </GroupBox>
              </div>
            )}
            <div className="col-12 mt-3">
              <div className="row">
                {initialValues?.files?.map((file: any, index: number) => {
                  return (
                    <div className="col-4 mb-4" key={index}>
                      <GroupBox>
                        <div className="col-12 d-flex justify-content-end">
                          <Button
                            bgColor={BgColors.Red}
                            className="p-1"
                            type="button"
                            onClick={() => deleteFile(file, index)}
                          >
                            {<DeleteIcon />}
                          </Button>
                        </div>
                        <div className="col-12">
                          <InputField
                            name={`fileName${index}`}
                            label="File Nomi"
                            onChange={(event: any) => onChangeFileName(event, index)}
                            value={file.originalFileName}
                          />
                        </div>
                        <div className="col-12">
                          <ImgUpload
                            setFiles={(event: any) => onChangeFile(event, index)}
                            className="px-3 py-2 mt-3 text-light"
                            bg_color={file.file === "" ? "bg-warning" : "bg-success"}
                            label={file.file === "" ? "Fayl yuklash" : "Fayl yuklandi"}
                            name={`file${index}`}
                          />
                        </div>
                      </GroupBox>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-12 d-flex justify-content-end mt-3">
              <Button
                type="button"
                className="px-3 py-2 ms-2 text-light"
                bgColor={BgColors.Yellow}
                onClick={addFile}
              >
                Fay qo'shish
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
