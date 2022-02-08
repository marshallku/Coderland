import { Link } from "react-router-dom";
import "./PostListItem.css";

export default function PostListItem({
  _id,
  title,
  author,
  commentCount,
  likes,
  views,
}: Omit<IPost, "contents" | "subject">) {
  return (
    <article key={_id} className="list-item">
      <Link className="list-item__link" to={`/posts/${_id}`}>
        <h2 className="list-item__title">{title}</h2>
        <header className="list-item__header">
          <div className="list-item__author">{author}</div>
          <div className="list-item__info">
            <i
              className="list-item__info-icon icon-comment"
              role="img"
              aria-label="댓글 수"
            />
            <span className="list-item__info-text">{commentCount}</span>
          </div>
          <div className="list-item__info">
            <i
              className="list-item__info-icon icon-thumb_up"
              role="img"
              aria-label="좋아요 수"
            />
            <span className="list-item__info-text">{likes}</span>
          </div>
          <div className="list-item__info">
            <i
              className="list-item__info-icon icon-visibility"
              role="img"
              aria-label="조회 수"
            />
            <span className="list-item__info-text">{views}</span>
          </div>
        </header>
      </Link>
    </article>
  );
}

export function PostListItemSkeleton({ key }: { key: number }) {
  return (
    <article key={key} className="list-item list-item--skeleton">
      <div className="list-item__link" />
    </article>
  );
}
