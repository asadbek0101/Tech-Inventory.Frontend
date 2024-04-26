import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import { useRegionApiContext } from "../../api/regions/RegionsApiContext";
import { useEffect, useState } from "react";
import { DistrictFilter } from "../../filters/DistrictFilter";
import { Form, Formik } from "formik";
import { InputField } from "../form/InputField";
import { showError } from "../../utils/NotificationUtils";
import { GroupBox } from "../ui/GroupBox";
import { noop } from "lodash";

import TabPage from "../tabs/TabPage";
import RegionsTable from "./RegionsTable";
import Button, { BgColors } from "../ui/Button";
import AddIcon from "../icons/AddIcon";
import DeleteIcon from "../icons/DeleteIcon";
import Paginator from "../paginator/Paginator";
import Modal from "../ui/Modal";
import YesOrNoModal from "../ui/YesOrNoModal";

interface Props {
  readonly filter: DistrictFilter;
}

export default function RegionsTableWrapper({ filter }: Props) {
  const [deleteDocuments, setDeleteDocuments] = useState<number[]>();
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const { RegionsApi } = useRegionApiContext();
  const { translate } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    RegionsApi.getRegions({ ...filter.getPaginationQuery(), searchValue })
      .then((r) => {
        setData(r?.data);
        setLoading(false);
      })
      .catch(showError);
  }, [RegionsApi, searchValue, filter]);

  return (
    <TabPage
      headerComponent={
        <div className="d-flex align-items-center justify-content-between">
          <Button
            className="py-1 px-3 text-light"
            bgColor={BgColors.Green}
            heigh="34px"
            icon={<AddIcon />}
            onClick={() => navigate(`/dashboard/regions/region-form`)}
          >
            {translate("ADD_BUTTON_TITLE")}
          </Button>
          <Formik initialValues={{ searchValue: "" }} onSubmit={noop}>
            {() => (
              <Form>
                <InputField
                  name="searchValue"
                  width={320}
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Seach..."
                />
              </Form>
            )}
          </Formik>
        </div>
      }
      footerComponent={
        <div className="d-flex justify-content-between align-items-center h-100">
          <Button
            disabled={!(deleteDocuments && deleteDocuments?.length > 0)}
            onClick={() => setDeleteModal(true)}
            className="py-2 px-2 text-light"
            bgColor={deleteDocuments && deleteDocuments?.length > 0 ? BgColors.Red : BgColors.White}
          >
            <DeleteIcon color={deleteDocuments && deleteDocuments?.length > 0 ? "#fff" : "#000"} />
          </Button>
          <Paginator
            filter={filter}
            totalPageCount={data?.totalPageCount}
            totalRowCount={data?.totalRowCount}
          />
        </div>
      }
    >
      <RegionsTable
        data={data?.data}
        setIds={setDeleteDocuments}
        loading={loading}
        setDistrict={(value) => {
          navigate(`/dashboard/regions/district-table?regionId=${value}`);
        }}
        editRegion={(value) => {
          navigate(`/dashboard/regions/region-form?regionId=${value}`);
        }}
      />
      <Modal
        show={deleteModal}
        closeHandler={() => setDeleteModal(false)}
        className="d-flex justify-content-center align-items-center"
        contentClassName="rounded p-4"
        width="500px"
      >
        <GroupBox>
          <YesOrNoModal
            title="REGION_TABLE_DELETE_REGIONS_MODAL_QUESTION"
            setResponse={(value: string) => {
              if (value === "YES") {
                const json: any = {
                  regionIds: deleteDocuments,
                };
                RegionsApi.deleteRegions(json)
                  .then(() => {
                    window.location.reload();
                  })
                  .catch(showError);
              }
              setDeleteModal(false);
            }}
          />
        </GroupBox>
      </Modal>
    </TabPage>
  );
}
