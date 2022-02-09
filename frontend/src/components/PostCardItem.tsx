import { Link } from "react-router-dom";
import formatClassName from "../utils/formatClassName";
import "./PostCardItem.css";

export default function PostCardItem({
  _id,
  title,
  contents,
  area,
  members,
  icon,
  tags,
  isCompleted,
}: IGatherPost) {
  return (
    <article
      key={_id}
      className={formatClassName(
        "card-item",
        isCompleted && "card-item--completed"
      )}
    >
      <Link className="card-item__link" to={`/gathers/${_id}`}>
        <div>
          <span
            className={formatClassName(
              "card-item__status",
              isCompleted && "card-item__status--completed"
            )}
          >{`모집${isCompleted ? "완료" : "중"}`}</span>
        </div>
        <h2 className="card-item__title">{title}</h2>
        <p className="card-item__contents">{contents}</p>
        <i
          className={`card-item__icon icon-${icon}`}
          role="img"
          aria-label={`${icon} 로고`}
        />
        <header className="card-item__header">
          <div className="card-item__info">
            <i className="card-item__info-icon icon-person" />
            <span className="card-item__info-text">
              인원 : {members.length}명
            </span>
          </div>
          <div className="card-item__info">
            <i className="card-item__info-icon icon-desktop_windows" />
            <span className="card-item__info-text">장소 : {area}</span>
          </div>
          <ul className="card-item__tags">
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>
      </Link>
    </article>
  );
}

export function PostCardItemSkeleton() {
  return (
    <article className="card-item card-item--skeleton">
      <div className="card-item__link">
        <div>
          <span className="card-item__status card-skeleton">로딩중</span>
        </div>
        <div className="card-item__title card-skeleton">Loading</div>
        <div className="card-item__contents">
          <div className="card-skeleton card-skelton--margin" />
          <div className="card-skeleton" />
        </div>
        <div className="card-item__icon card-skeleton card-skeleton--icon" />
        <header className="card-item__header">
          <div className="card-item__info">
            <i className="card-item__info-icon icon-person" />
            <span className="card-item__info-text card-skeleton" />
          </div>
          <div className="card-item__info">
            <i className="card-item__info-icon icon-desktop_windows" />
            <span className="card-item__info-text card-skeleton" />
          </div>
          <ul className="card-item__tags">
            {Array.from({ length: 3 }).map((_, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={i} className="card-skeleton" />
            ))}
          </ul>
        </header>
      </div>
    </article>
  );
}
