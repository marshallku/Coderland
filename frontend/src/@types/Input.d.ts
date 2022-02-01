interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}

interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
}
