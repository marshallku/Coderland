import { Link } from "react-router-dom";
import formatClassName from "../utils/formatClassName";
import { formatToReadableTime } from "../utils/time";
import "./PostCardItem.css";

export default function PostCardItem({
  _id,
  title,
  category,
  excerpt,
  author,
  createdAt,
  area,
  members,
  icon,
  tags,
  isCompleted,
}: IGatherPostInList) {
  const categories: Array<TGatherCategory> = ["study", "code", "team"];
  const categoriesInKr = ["스터디", "모각코", "프로젝트"];

  return (
    <article
      key={_id}
      className={formatClassName(
        "card-item",
        isCompleted && "card-item--completed"
      )}
    >
      <Link className="card-item__link" to={`/gathers/${_id}`}>
        <div className="card-item__statuses">
          <span
            className={formatClassName(
              "card-item__status",
              isCompleted && "card-item__status--completed"
            )}
          >{`${isCompleted ? "모집 완료" : "모집 중"}`}</span>
          <span className="card-item__category">
            {categoriesInKr[categories.indexOf(category)]}
          </span>
        </div>
        <header className="card-item__inner">
          <div className="card-item__icon">
            <i
              className={`icon-${icon}`}
              role="img"
              aria-label={`${icon} 로고`}
            />
          </div>
          <h2 className="card-item__title">{title}</h2>
          <p className="card-item__contents">{excerpt}</p>
          <div>
            <time dateTime={createdAt} className="card-item__created-at">
              {formatToReadableTime(createdAt)}
            </time>
          </div>
          <div className="card-item__author">{author.nickname}</div>
          <div className="card-item__infos">
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
      <div className="card-item__statuses">
        <span className="card-item__status card-skeleton" />
        <span className="card-item__category card-skeleton" />
      </div>
      <header className="card-item__inner">
        <div className="card-item__icon card-skeleton card-skeleton--icon" />
        <div className="card-item__title card-skeleton" />
        <p className="card-item__contents card-skeleton" />
        <div>
          <span className="card-item__created-at card-skeleton" />
        </div>
        <div className="card-item__author card-skeleton" />
        <div className="card-item__infos">
          <div className="card-item__info">
            <i className="card-item__info-icon icon-person" />
            <span className="card-skeleton" />
          </div>
          <div className="card-item__info">
            <i className="card-item__info-icon icon-desktop_windows" />
            <span className="card-item__info-text card-skeleton" />
          </div>
        </div>
        <ul className="card-item__tags">
          {Array.from({ length: 3 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i} className="card-skeleton" />
          ))}
        </ul>
      </header>
    </article>
  );
}
