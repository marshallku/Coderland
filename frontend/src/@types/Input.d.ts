interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label?: string;
}
