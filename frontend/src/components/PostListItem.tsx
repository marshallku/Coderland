import "./PostListItem.css";
import { Link } from "react-router-dom";

export default function PostListItem({ postList }: IPostItemProps) {
  return (
    <div>
      {postList?.map(({ _id, title, author, commentCount, likes, view }) => (
        <Link key={_id} className="post-list__post" to={`/posts/${_id}`}>
          <div className="post__title">{title}</div>
          <div className="post__comments">
            <i
              className="comments__icon icon-comment"
              role="img"
              aria-label="댓글수"
            />
            <span className="comments__number">{commentCount}</span>
          </div>
          <div className="post__likes">
            <i
              className="likes__icon icon-thumb_up"
              role="img"
              aria-label="좋아요수"
            />
            <span className="likes__number">{likes}</span>
          </div>
          <div className="post__view">
            <i
              className="view__icon icon-visibility"
              role="img"
              aria-label="조회수"
            />
            <span className="view__number">{view}</span>
          </div>
          <div className="post__author">{author}</div>
        </Link>
      ))}
    </div>
  );
}
