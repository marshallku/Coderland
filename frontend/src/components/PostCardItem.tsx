import "./PostCardItem.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

export default function PostCardItem({ postList }: IPostCardItemProps) {
  return (
    <>
      <Navigation
        list={[
          { title: "전체", to: "/gather" },
          { title: "스터디", to: "/gather/study" },
          { title: "모각코", to: "/gather/code" },
          { title: "프로젝트", to: "/gather/team" },
        ]}
        align="center"
      />
      <div className="post-list-card-wrapper">
        {postList.map(
          ({
            _id,
            title,
            contents,
            area,
            members,
            icon,
            tags,
            isCompleted,
          }) => (
            <article
              key={_id}
              className={`card-item ${
                isCompleted ? "card-item--completed" : ""
              }`}
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
          )
        )}
      </div>
    </>
  );
}
