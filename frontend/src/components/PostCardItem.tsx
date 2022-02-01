import { Link } from "react-router-dom";
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
      className={`card-item ${isCompleted ? "card-item--completed" : ""}`}
    >
      <Link className="card-item__link" to={`/gathers/${_id}`}>
        <div>
          <span
            className={`card-item__status ${
              isCompleted ? "card-item__status--completed" : ""
            }`}
          >{`모집${isCompleted ? "완료" : "중"}`}</span>
        </div>
        <h2 className="card-item-title">{title}</h2>
        <p className="card-item-contents">{contents}</p>
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
