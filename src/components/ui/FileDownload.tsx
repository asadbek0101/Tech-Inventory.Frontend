import "./assets/download.scss";

interface Props {
  readonly title?: string;
  readonly className?: string;
  readonly onClick?: (value: any) => void;
}

export default function FileDownload({ className, onClick, title }: Props) {
  return (
    <div className={`download-file-container ${className}`}>
      <button onClick={onClick && onClick}>{title}</button>
    </div>
  );
}
