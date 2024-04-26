import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import Button, { BgColors } from "../ui/Button";
import { useCallback } from "react";
import { update } from "immupdate";
import { useI18n } from "../../i18n/I18nContext";
import { object, string } from "yup";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
}

const validationSchema = object({
  name: string().required("Reqired!"),
  info: string(),
});

export default function NumberOfOrderForm({ initialValues, setInitialValues, onSubmit }: Props) {
  const { translate } = useI18n();
  const onChangeName = useCallback((event: any) => {
    setInitialValues((prev: any) =>
      update(prev, {
        name: event?.target.value,
      }),
    );
  }, []);

  const onChangeNumber = useCallback((event: any) => {
    setInitialValues((prev: any) =>
      update(prev, {
        number: event?.target.value,
      }),
    );
  }, []);

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
              <GroupBox title="Create Number Of Order">
                <div className="col-12">
                  <InputField name="name" label="Name" onChange={onChangeName} />
                </div>
                <div className="col-12 my-3">
                  <TextAreaField name="number" label="Number" onChange={onChangeNumber} />
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
