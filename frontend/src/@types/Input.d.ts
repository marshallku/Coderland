interface IInputBoxProps {
  hideLabelOnFocus?: boolean;
  label?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    IInputBoxProps {}

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    IInputBoxProps {}
