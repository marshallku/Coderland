import "./DisplayError.css";

export default function DisplayError({ message }: IDisplayErrorProps) {
  return (
    <div className="error">
      <span className="error__emoji" role="img" aria-label="눈물">
        😢
      </span>
      <h2 className="error__title">{message}</h2>
    </div>
  );
}
