import "./assets/download.scss";

interface Props {
  readonly title?: string;
  readonly className?: string;
  readonly onClick?: (value: any) => void;
}

export default function FileDownload({ className, onClick, title }: Props) {
  return (
    <div className={`download-file-container ${className}`} onClick={onClick && onClick}>
      <img width={30} height={30} src={require("./assets/download.png")} alt="" />{" "}
      <span>{title}</span>
    </div>
  );
}
