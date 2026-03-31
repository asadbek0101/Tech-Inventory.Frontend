import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import Button, { BgColors } from "../ui/Button";
import { useCallback } from "react";
import { update } from "immupdate";
import { useI18n } from "../../i18n/I18nContext";
import { object, string } from "yup";
import { InitialNumberOfOrderProps } from "../../api/number-of-orders/NumberOfOrderDto";
import { SelectPickerOptionsProps } from "../../api/AppDto";
import { SelectPickerField } from "../form/SelectPrickerField";

interface Props {
  readonly initialValues: InitialNumberOfOrderProps;
  readonly regions: SelectPickerOptionsProps[];
  readonly districts: SelectPickerOptionsProps[];
  readonly onChangeRegionId: (value: any) => void;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
  number: string().required("Reqired!"),
  info: string(),
});

export default function NumberOfOrderForm({
  initialValues,
  onChangeRegionId,
  setInitialValues,
  onSubmit,
  regions,
  districts,
}: Props) {
  const { translate } = useI18n();

  const onChangeNumber = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          number: event?.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeDistrictId = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          districtId: event,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeInfo = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          info: event?.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={validationSchema}
    >
      {() => (
        <Form>
          <div className="row p-4">
            <div className="col-6">
              <GroupBox title="Buyurtma raqam yaratish">
                <div className="col-12">
                  <InputField
                    name="number"
                    label="Buyurtma raqam"
                    onChange={onChangeNumber}
                    value={initialValues.number}
                  />
                </div>
                <div className="col-12 mt-3">
                  <SelectPickerField
                    name="regionId"
                    label="Viloyat"
                    onChanges={onChangeRegionId}
                    options={regions}
                  />
                </div>
                <div className="col-12 mt-3">
                  <SelectPickerField
                    name="districtId"
                    label="Tuman"
                    onChanges={onChangeDistrictId}
                    options={districts}
                  />
                </div>
                <div className="col-12 mt-3">
                  <TextAreaField
                    name="_info"
                    label="Qo'shimcha ma'lumot"
                    onChange={onChangeInfo}
                    defaultValue={initialValues.info}
                  />
                </div>
                <div className="col-12 d-flex justify-content-end mt-3">
                  <Button type="submit" className="px-3 py-2 text-light" bgColor={BgColors.Green}>
                    {translate("SAVE_BUTTON_TITLE")}
                  </Button>
                </div>
              </GroupBox>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
