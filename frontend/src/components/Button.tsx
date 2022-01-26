import "./Button.css";

export default function Button({
  value,
  type = "button",
  style = "primary",
  disabled,
  size = "medium",
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`button button--${style} button--${size}`}
      disabled={disabled}
    >
      {value}
    </button>
  );
}
