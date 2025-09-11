import { ReactNode } from "react";
import Modal from "react-bootstrap/Modal";

interface Props {
  readonly show: boolean;
  readonly onHide: () => void;
  readonly children: ReactNode;
  readonly width?: string | number;
  readonly height?: string | number;
}

export default function CustomModal({ show, onHide, children, width, height }: Props) {
  const dialogStyle: React.CSSProperties = {
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    maxWidth: "100%",
    maxHeight: "100%",
  };

  return (
    <Modal show={show} onHide={onHide} centered dialogStyle={dialogStyle} contentClassName="p-0">
      <Modal.Body style={{ height: "100%", overflowY: "auto" }}>{children}</Modal.Body>
    </Modal>
  );
}
