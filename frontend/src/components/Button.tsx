import "./Button.css";

export default function Button({
  value,
  type = "button",
  buttonStyle = "primary",
  disabled,
  size = "medium",
  onClick,
}: IButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`button button--${buttonStyle} button--${size}`}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
}
