import { Form, Formik } from "formik";
import { GroupBox } from "../ui/GroupBox";
import { InputField } from "../form/InputField";
import { noop } from "lodash";
import ImageUploadField from "../form/ImageUploadField";

interface Props {
  readonly initialValues: any;
}

export default function SettingsUsersForm({ initialValues }: Props) {
  return (
    <Formik initialValues={initialValues} onSubmit={noop} enableReinitialize={true}>
      {() => (
        <Form>
          <div className="row p-4">
            <div className="col-12">
              <GroupBox title="Foydalanuvchi">
                <div className="row">
                  <div className="col-2">
                    <ImageUploadField label="" onChange={noop} value={initialValues.image || ""} />
                  </div>
                  <div className="col-10">
                    <div className="row">
                      <div className="col-4 my-2">
                        <InputField
                          label="Ism"
                          name="firstName"
                          value={initialValues.firstName}
                          disabled
                        />
                      </div>
                      <div className="col-4 my-2">
                        <InputField
                          label="Familiya"
                          name="lastName"
                          value={initialValues.lastName}
                          disabled
                        />
                      </div>
                      <div className="col-4 my-2">
                        <InputField
                          label="Otasining ismi"
                          name="middleName"
                          value={initialValues.middleName}
                          disabled
                        />
                      </div>
                      <div className="col-4 my-2">
                        <InputField
                          label="Elektron pochta"
                          name="email"
                          value={initialValues.email}
                          disabled
                        />
                      </div>
                      <div className="col-4 my-2">
                        <InputField
                          label="Telefon raqam"
                          name="phoneNumber"
                          value={initialValues.phoneNumber}
                          disabled
                        />
                      </div>
                      <div className="col-4 my-2">
                        <InputField
                          label="Username"
                          name="userName"
                          value={initialValues.userName}
                          disabled
                        />
                      </div>
                      <div className="col-4 my-2">
                        <InputField
                          label="Viloyat"
                          name="region"
                          value={initialValues.region}
                          disabled
                        />
                      </div>
                      <div className="col-4 my-2">
                        <InputField label="Lavozim" name="roleName" value={initialValues.roleName} disabled />
                      </div>
                    </div>
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
