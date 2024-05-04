import { useCallback, useState } from "react";

import "./assets/upload-image.scss";

interface Props {
  readonly onChange: (value: any) => void;
  readonly value: string;
  readonly label?: string;
}

export default function ImageUploadField({ onChange, label = "Upload Image", value }: Props) {
  const [image, setImage] = useState<string>("");

  const onChangeFile = useCallback(
    (event: any) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        onChange(reader.result?.toString());

        setImage("downloaded");
      };

      reader.onerror = () => {
        setImage("error");
      };

      reader.readAsDataURL(event.target.files[0]);
    },
    [onChange],
  );

  return (
    <div className="image-upload-field">
      <label htmlFor="asadbek" className={`fw-bold text-success`}>
        {label}
      </label>
      <input
        type="file"
        className="d-none"
        hidden
        id="asadbek"
        onChange={(event) => onChangeFile(event)}
      />
      <img src={value} width="100%" height="100%" alt="rasm" />
    </div>
  );
}
