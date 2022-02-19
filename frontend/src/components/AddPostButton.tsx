import { Link } from "react-router-dom";
import "./AddPostButton.css";

export default function AddPostButton({ to }: IAddPostButtonProps) {
  return (
    <Link className="add-post" to={`/write/${to}`}>
      <i className="icon-create" role="img" aria-label="글 작성" />
    </Link>
  );
}
