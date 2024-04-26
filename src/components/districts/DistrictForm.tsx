import { Form, Formik } from "formik";
import { object, string } from "yup";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import { GroupBox } from "../ui/GroupBox";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback } from "react";
import { update } from "immupdate";
import { DistrictProps } from "../../api/districts/DistrictsDto";

import Button, { BgColors } from "../ui/Button";

interface Props {
  readonly initialValues: DistrictProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
  name: string().required("Reqired!"),
  _info: string(),
});

export default function DistrictForm({ initialValues, setInitialValues, onSubmit }: Props) {
  const { translate } = useI18n();

  const onChangeName = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          name: event?.target.value,
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
      validationSchema={validationSchema}
      enableReinitialize={true}
    >
      {() => (
        <Form>
          <div className="row p-4">
            <div className="col-6">
              <GroupBox title="DISTRICT_FORM_CREATE_DISTRICT_TITLE">
                <div className="col-12">
                  <InputField
                    name="DISTRICT_FORM_DISTRICT_NAME_FIELD_TITLE"
                    label="Name"
                    onChange={onChangeName}
                    value={initialValues?.name}
                  />
                </div>
                <div className="col-12 my-3">
                  <TextAreaField
                    name="_info"
                    label="DISTRICT_FORM_DISTRICT_INFO_FIELD_TITLE"
                    onChange={onChangeInfo}
                    defaultValue={initialValues?.info}
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
