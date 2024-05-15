import "./assets/upload.scss";

interface ImgUploadProps {
  readonly setFiles: (value: any) => void;
  readonly className?: string;
  readonly label?: string;
  readonly name?: string;
}

export default function ImgUpload({
  setFiles,
  className,
  label = "Fayl yuklash",
  name,
}: ImgUploadProps) {
  return (
    <div className={`upload-container `}>
      <input
        name={name}
        id="fileUpload"
        multiple
        className="hidden"
        type="file"
        hidden
        onChange={setFiles}
      />
      <label className={`upload-label ${className} bg-warning`} htmlFor="fileUpload">
        {label}
      </label>
    </div>
  );
}
