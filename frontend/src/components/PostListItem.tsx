import { Link } from "react-router-dom";
import { formatToReadableTime } from "../utils/time";
import Clap from "./Clap";
import "./PostListItem.css";

export default function PostListItem({
  _id,
  title,
  excerpt,
  author,
  commentCount,
  createdAt,
  likes,
  views,
}: IPostInList) {
  return (
    <article key={_id} className="list-item">
      <Link className="list-item__link" to={`/posts/${_id}`}>
        <h2 className="list-item__title">{title}</h2>
        <p className="list-item__excerpt">{excerpt}</p>
        <header className="list-item__header">
          <div className="list-item__author">{author.nickname}</div>
          <div className="list-item__info">
            <time dateTime={createdAt}>{formatToReadableTime(createdAt)}</time>
          </div>
          <div className="list-item__info">
            <i
              className="list-item__info-icon icon-comment"
              role="img"
              aria-label="댓글 수"
            />
            <span className="list-item__info-text">{commentCount}</span>
          </div>
          <div className="list-item__info">
            <Clap className="list-item__info-icon" />
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

export function PostListItemSkeleton() {
  return (
    <article className="list-item list-item--skeleton">
      <div className="list-item__link">
        <div className="list-item__title list-skeleton" />
        <div className="list-item__excerpt list-skeleton" />
      </div>
    </article>
  );
}
