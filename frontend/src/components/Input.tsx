import "./Input.css";

export default function Input(props: InputProps) {
  const { id, label, type, required } = props;

  return (
    <div className="input">
      <input
        {...props}
        id={id}
        className={`input__input ${props.className || ""}`}
        type={type || "text"}
        placeholder=" "
      />
      <label htmlFor={id} className="input__label">
        {label}
        {required ? " *" : ""}
      </label>
    </div>
  );
}
