import { useState } from "react";
import "./CommentLikeBtn.css";

export default function CommentLikeBtn({ likes }: ILikeProps) {
  const [likesCount, setLikesCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

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
