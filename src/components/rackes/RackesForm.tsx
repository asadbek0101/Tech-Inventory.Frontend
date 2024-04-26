import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { TextAreaField } from "../form/TextAreaField";
import { object, string } from "yup";
import Button, { BgColors } from "../ui/Button";
import { useI18n } from "../../i18n/I18nContext";
import { useCallback } from "react";
import { update } from "immupdate";
import { RackesInitialProps } from "../../api/rackes/RackesDto";
import { ProductFormTypes } from "../../filters/ObjectFilter";

interface Props {
  readonly initialValues: RackesInitialProps;
  readonly setInitialValues: (value: any) => void;
  readonly onSubmit: (value: any) => void;
  readonly formType?: ProductFormTypes;
}

const validationSchema = object({
  numberOfFibers: string().required("Required!"),
  typeOfAdapter: string().required("Required!"),
  countOfPorts: string().required("Required!"),
  info: string(),
});

export default function RackesForm({
  initialValues,
  setInitialValues,
  onSubmit,
  formType = ProductFormTypes.WithOutObjectForm,
}: Props) {
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

  const onChangeNumberOfFibers = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          numberOfFibers: event?.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeTypeOfAdapter = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          typeOfAdapter: event?.target.value,
        }),
      );
    },
    [setInitialValues],
  );

  const onChangeCountOfPorts = useCallback(
    (event: any) => {
      setInitialValues((prev: any) =>
        update(prev, {
          countOfPorts: event?.target.value,
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
              <GroupBox>
                <div className="row">
                  <div className="col-12">
                    <InputField
                      name="numberOfFibers"
                      label="Tolalar soni"
                      value={initialValues.numberOfFibers}
                      onChange={onChangeNumberOfFibers}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="typeOfAdapter"
                      label="Adapter turi"
                      value={initialValues.typeOfAdapter}
                      onChange={onChangeTypeOfAdapter}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <InputField
                      name="countOfPorts"
                      label="Portlar soni"
                      value={initialValues.countOfPorts}
                      onChange={onChangeCountOfPorts}
                    />
                  </div>
                  <div className="col-12 mt-3">
                    <TextAreaField
                      name="_info"
                      label="Qo'shimcha malumot"
                      defaultValue={initialValues.info}
                      onChange={onChangeInfo}
                    />
                  </div>
                  {formType === ProductFormTypes.WithOutObjectForm && (
                    <div className="col-12 d-flex justify-content-end mt-3">
                      <Button
                        type="submit"
                        className="px-3 py-2 text-light"
                        bgColor={BgColors.Green}
                      >
                        {translate("SAVE_BUTTON_TITLE")}
                      </Button>
                    </div>
                  )}
                </div>
              </GroupBox>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
