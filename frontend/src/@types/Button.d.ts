interface ButtonProps {
  value: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  style?:
    | "primary-ghost"
    | "primary-second"
    | "primary"
    | "warning-second"
    | "warning"
    | "multipurpose";
  size?: "large" | "medium" | "small";
}
