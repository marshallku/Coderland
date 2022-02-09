interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  buttonStyle?:
    | "primary-ghost"
    | "primary-second"
    | "primary"
    | "warning-second"
    | "warning"
    | "multipurpose";
  size?: "large" | "medium" | "small";
}
