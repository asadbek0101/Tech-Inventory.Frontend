import "./assets/upload.scss";

interface ImgUploadProps {
  readonly setFiles: (value: any) => void;
  readonly className?: string;
  readonly bg_color?: string;
  readonly label?: string;
  readonly name?: string;
}

export default function ImgUpload({
  setFiles,
  className,
  label = "Fayl yuklash",
  bg_color = "bg-warning",
  name,
}: ImgUploadProps) {
  return (
    <div className={`upload-container `}>
      <input
        name={name}
        id={name}
        className="hidden"
        type="file"
        hidden
        onChange={setFiles}
      />
      <label className={`upload-label ${className} ${bg_color}`} htmlFor={name}>
        {label}
      </label>
    </div>
  );
}
