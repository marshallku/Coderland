import "./PostCardItem.css";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

export default function PostCardItem({ postList }: IPostCardItemProps) {
  return (
    <>
      <Navigation
        list={[
          { title: "전체", to: "/gather" },
          { title: "스터디", to: "/gather?category=study" },
          { title: "모각코", to: "/gather?category=code" },
          { title: "프로젝트", to: "/gather?category=team" },
        ]}
        align="center"
      />
      <div className="post-list-card-wrapper">
        {postList?.map(
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
            <Link
              key={_id}
              className={`post-list__card ${isCompleted ? "complete" : ""}`}
              to={`/posts/${_id}`}
            >
              <div className="card-title">{title}</div>
              <div className="card-contents">{contents}</div>
              <i
                className={`card-image icon-${icon}`}
                role="img"
                aria-label={`${icon} 아이콘`}
              />
              <div className="card-member">
                <div className="card-member__wrapper">
                  <i
                    className="card-member__icon icon-person"
                    role="img"
                    aria-label="모집인원수를 나타내는 사람모양 아이콘"
                  />
                  <span className="card-member__text">
                    인원 : {members.length}명
                  </span>
                </div>
                <span
                  className={`card-member__is-completed ${
                    isCompleted ? "complete" : ""
                  }`}
                >{`모집${isCompleted ? "완료" : "중"}`}</span>
              </div>
              <div className="card-area">
                <i
                  className="card-area__icon icon-desktop_windows"
                  role="img"
                  aria-label="장소를 나타내는 컴퓨터모양 아이콘"
                />
                <span className="card-area__text">장소 : {area}</span>
              </div>
              <ul className="card-tags">
                {tags.map((tag) => (
                  <li className="card-tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          )
        )}
      </div>
    </>
  );
}
