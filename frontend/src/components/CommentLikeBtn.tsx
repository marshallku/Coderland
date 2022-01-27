import { useState } from "react";
import "./CommentLikeBtn.css";

export default function CommentLikeBtn(props: { likes: number }) {
  const [likesCount, setLikesCount] = useState<number>(props.likes);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
  };

  return (
    <button
      className={`comment__likes ${isLiked ? "comment__likes--liked" : ""}`}
      type="button"
      onClick={handleLikeClick}
    >
      <i className="icon-thumb_up" />
      좋아요 {likesCount === 0 ? "" : likesCount}
    </button>
  );
}
