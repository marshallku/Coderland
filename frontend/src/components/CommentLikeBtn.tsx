import formatClassName from "../utils/formatClassName";
import "./CommentLikeBtn.css";

export default function CommentLikeBtn({
  likesCount,
  setLikesCount,
  isLiked,
  setIsLiked,
}: ILikeProps) {
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
      type="button"
      className={formatClassName(
        "comment__likes",
        isLiked && "comment__likes--liked"
      )}
      onClick={handleLikeClick}
    >
      <i className="icon-thumb_up" />
      {likesCount === 0 ? "좋아요" : likesCount}
    </button>
  );
}
