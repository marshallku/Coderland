import "./DisplayError.css";

export default function DisplayError({ message }: IDisplayErrorProps) {
  return (
    <div className="error">
      <span className="error__emoji">😢</span>
      <h2 className="error__title">{message}</h2>
    </div>
  );
}
