import Button from "../ui/Button";
import "./assets/custom-popup.scss";

interface Props {
  readonly itemObject: {
    vendingNumber: number;
    name: string;
    address: string;
    status: string;
    countOfProducts: number;
    countOfDevices: number;
    summ: any;
  };

  readonly setProduct: () => void;
  readonly setDevice: () => void;
}

export default function CustomPopup({ itemObject, setDevice, setProduct }: Props) {
  return (
    <div className="custom-popup-wrapper">
      <div className="custom-popup-header">Mashina haqida</div>
      <div className="custom-popup-body">
        <div className="custom-popup-body-row">
          <div className="fw-bold">Raqami:</div>
          <div>{itemObject.vendingNumber}</div>
        </div>
        <div className="custom-popup-body-row">
          <div className="fw-bold">Nomi:</div>
          <div>{itemObject.name}</div>
        </div>
        <div className="custom-popup-body-row">
          <div className="fw-bold">Manzili:</div>
          <div>{itemObject.address}</div>
        </div>
        <div className="custom-popup-body-row">
          <div className="fw-bold">Status:</div>
          <div>{itemObject.status}</div>
        </div>
        <div className="custom-popup-body-row">
          <div className="fw-bold">Maxsulotlar:</div>
          <div>{itemObject.countOfProducts}</div>
        </div>
        <div className="custom-popup-body-row">
          <div className="fw-bold">Qurilmalar:</div>
          <div>{itemObject.countOfDevices}</div>
        </div>
        <div className="custom-popup-body-row">
          <div className="fw-bold">Ishlangan summa:</div>
          <div>
            {new Intl.NumberFormat("uz-UZ", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(itemObject.summ)}{" "}
          </div>
        </div>
      </div>
      <div className="custom-popup-footer d-flex justify-content-center align-items-center gap-1">
        <Button className="w-50 py-1" onClick={setProduct}>
          Maxsulotlar
        </Button>
        <Button className="w-50 py-1" onClick={setDevice}>
          Qurilmalar
        </Button>
      </div>
    </div>
  );
}
