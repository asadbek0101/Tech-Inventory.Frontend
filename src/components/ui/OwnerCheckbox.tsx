import "./assets/owner-checkbox.scss";

interface Props {
  readonly checked: boolean;
  readonly onChange: (value: boolean) => void;
  readonly title: string;
}

export default function OwnerCheckbox({ checked, onChange, title }: Props) {
  return (
    <div className="owner-checkbox">
      <label className="toggle-switch">
        <input type="checkbox" checked={checked} onChange={() => onChange(!checked)} />
        <span className="slider"></span>
      </label>
      <div className="owner-checkbox-title" onClick={() => onChange(!checked)}>
        {title}
      </div>
    </div>
  );
}
