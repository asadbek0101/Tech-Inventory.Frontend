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
import { ObjectClassTypeInitialProps } from "../../api/object-class-type/ObjectClassTypeDto";

interface Props {
  readonly initialValues: ObjectClassTypeInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
  name: string().required("Reqired!"),
  _info: string(),
});

export default function ObjectClassForm({ initialValues, setInitialValues, onSubmit }: Props) {
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
              <GroupBox title="Tasnif yaratish">
                <div className="col-12">
                  <InputField
                    name="name"
                    label="Tasnif nomi"
                    onChange={onChangeName}
                    value={initialValues?.name}
                  />
                </div>
                <div className="col-12 my-3">
                  <TextAreaField
                    name="_info"
                    label="Qo'shimcha ma'lumot"
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
