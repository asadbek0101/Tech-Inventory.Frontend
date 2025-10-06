import { useI18n } from "../../i18n/I18nContext";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { useEffect, useState } from "react";
import { showError } from "../../utils/NotificationUtils";
import { ObjectFilter, ObjectFilterTabs } from "../../filters/ObjectFilter";
import { GroupBox } from "../ui/GroupBox";
import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { noop } from "lodash";
import { toast } from "react-toastify";
import { useShallowEqualSelector } from "../../hooks/useShallowSelector";
import { appIsCreatedBySelector, switchIsCreatedBy } from "../../reducers/appReducer";
import { profileSelector, userIdSelector } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";
import { CheckRole } from "../../utils/CheckRole";
import { UserRoles } from "../../api/AppDto";

import AddIcon from "../icons/AddIcon";
import Button, { BgColors } from "../ui/Button";
import ObjectTable from "./ObjectTable";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";
import useLocationHelpers from "../../hooks/userLocationHelpers";
import TabPage from "../tabs/TabPage";
import OwnerCheckbox from "../ui/OwnerCheckbox";

interface Props {
  readonly filter: ObjectFilter;
}

export default function ObjectTableWrapper({ filter }: Props) {
  const [data, setData] = useState<any>();
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const locationHelpers = useLocationHelpers();
  const showOnlyCreatedMe = useShallowEqualSelector(appIsCreatedBySelector);
  const userId = useShallowEqualSelector(userIdSelector);

  const profile = useShallowEqualSelector(profileSelector);

  const { translate } = useI18n();
  const { ObyektApi } = useObyektApiContext();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    ObyektApi.getObyekts({
      ...filter.getObjectFilter(),
      createdBy: showOnlyCreatedMe ? Number(userId) : filter.getObjectFilter().createdBy,
    })
      .then((r) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [ObyektApi, filter, userId, showOnlyCreatedMe]);

  return (
    <TabPage
      headerComponent={
        <div className="d-flex justify-content-between">
          {!Boolean(CheckRole(UserRoles.Accountant, profile)) ? (
            <Button
              className="py-1 px-3 text-light"
              bgColor={BgColors.Green}
              heigh="34px"
              icon={<AddIcon />}
              onClick={() =>
                locationHelpers.pushQuery({
                  tab: ObjectFilterTabs.ObjectForm,
                  objectFormType: "1",
                })
              }
            >
              {translate("ADD_BUTTON_TITLE")}
            </Button>
          ) : (
            <div />
          )}

          <Formik
            initialValues={{
              searchValue: filter?.getObjectFilter()?.searchValue,
              showOnlyCreatedMe: showOnlyCreatedMe,
            }}
            onSubmit={noop}
            enableReinitialize={true}
          >
            {() => (
              <Form className="d-flex gap-2">
                {!Boolean(CheckRole(UserRoles.Accountant, profile)) && (
                  <div className="d-flex align-items-center gap-2">
                    <OwnerCheckbox
                      checked={showOnlyCreatedMe}
                      title="Faqat men yaratganlar"
                      onChange={(value) => {
                        dispatch(
                          switchIsCreatedBy({
                            isCreatedBy: !showOnlyCreatedMe,
                          }),
                        );
                      }}
                    />
                  </div>
                )}

                <InputField
                  name="searchValue"
                  width={320}
                  onChange={(event) =>
                    locationHelpers.replaceQuery({
                      searchValue: event.target.value,
                    })
                  }
                  placeholder="Seach..."
                />
              </Form>
            )}
          </Formik>
        </div>
      }
      footerComponent={
        <div>
          <div className="d-flex justify-content-between align-items-center mt-4 pb-3">
            {!Boolean(CheckRole(UserRoles.Accountant, profile)) ? (
              <Button
                disabled={!(deleteDocuments && deleteDocuments?.length > 0)}
                onClick={() => setDeleteModal(true)}
                className="py-2 px-2 text-light"
                bgColor={
                  deleteDocuments && deleteDocuments?.length > 0 ? BgColors.Red : BgColors.White
                }
              >
                <DeleteIcon
                  color={deleteDocuments && deleteDocuments?.length > 0 ? "#fff" : "#000"}
                />
              </Button>
            ) : (
              <div />
            )}
            <Paginator
              filter={filter}
              totalPageCount={data?.totalPageCount}
              totalRowCount={data?.totalRowCount}
            />
          </div>
          <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
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
        </div>
      }
    >
      <ObjectTable
        loading={loading}
        data={data?.data}
        selectIds={setDeleteDocuments}
        readOnMap={(value) =>
          locationHelpers.pushQuery({
            tab: ObjectFilterTabs.ObjectOnView,
            objectId: value,
          })
        }
        downloadPdf={(value) =>
          locationHelpers.pushQuery({
            tab: ObjectFilterTabs.ObjectPdfReport,
            objectId: value,
          })
        }
        editObyekt={(value) =>
          locationHelpers.pushQuery({
            tab: ObjectFilterTabs.ObjectForm,
            objectId: value,
          })
        }
        setOjectForView={(value) => {
          console.log("old location", location);
          console.log("new query", { tab: ObjectFilterTabs.ObjectView, objectId: value });
          locationHelpers.pushQuery({
            tab: ObjectFilterTabs.ObjectView,
            objectId: value,
          });
        }}
      />
    </TabPage>
  );
}
