import { useState } from "react";
import useApi from "../hooks/api";
import { dummyGatherResponse, dummyPostResponse } from "../api/dummy";
import { formatToReadableTime } from "../utils/time";
import MarkdownViewer from "../components/MarkdownViewer";
import Comments from "../components/Comments";
import "./Details.css";

export function GatherDetails() {
  const [likesStatus, setLikesStatus] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);

  const selected = useApi(dummyGatherResponse);
  // response.find((post) => post._id === params.id);

  // useEffect(() => {}, [likesStatus, bookmarkStatus]);

  function handleBookmarkClick() {
    setBookmarkStatus(!bookmarkStatus);
  }

  function handleLikesClick() {
    setLikesStatus(!likesStatus);
    // TODO: put?patch? 통신하여 likesStatus에 따라 증가/감소값 넘겨주기 (id건네주어서 해당 db값 변경)
    // 참고: async function postTopic(evt) {
    //   const response = await fetch('http://localhost:3000/topics/', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    // body: JSON.stringify({ _id: , likes: selected +-1 })
    //   });
    //   const result = await response.json();
    //   return result;
    // }
  }

  return (
    <>
      <header className="details-header">
        <h2 className="details-header__title">{selected?.gather.title}</h2>
        <div className="details-header__contents">
          <div className="details-header__author">
            {selected?.gather.author}
          </div>
          <time
            className="details-header__created"
            dateTime={selected?.gather.createdAt || ""}
          >
            {formatToReadableTime(selected?.gather.createdAt || "")}
          </time>
          <div className="details-header__views">
            <i className="icon-visibility" role="img" aria-label="조회 수" />
            {selected?.gather.views}
          </div>
        </div>
      </header>
      <div className="details-body">
        <article className="details-body__article">
          <div className="details-body__tags">
            {selected?.gather.tags.map((tag) => (
              <i
                key={tag}
                className={`icon-${tag}`}
                role="img"
                aria-label={tag}
              />
            ))}
          </div>
          <div className="details-body__info">
            <i className="icon-info_outline" />
            상태: 모집 {`${selected?.gather.isCompleted ? "완료" : "중"}`}
          </div>
          <div className="details-body__info">
            <i className="icon-desktop_windows" />
            장소: {selected?.gather.area}
          </div>
          <div className="details-body__info">
            <i className="icon-person" />
            인원: {selected?.gather.members.length}명
          </div>
          <MarkdownViewer
            value={selected?.gather.contents || ""}
            className="details-body__content"
          />
          <div className="details-body__members member-list">
            <h3 className="member-list__title">현재 팀원</h3>
            <ul className="member-list__container">
              {selected?.gather.members.map((member: IMemberProps) => (
                <li key={member.nickname} className="member-list__item">
                  <img
                    src={member.profile}
                    alt={`${member.nickname}님의 이미지`}
                    title={`${member.nickname} ${member.track}`}
                  />
                  <h4>{member.nickname}</h4>
                </li>
              ))}
            </ul>
          </div>
        </article>
        <div className="details-body__buttons">
          <button
            type="button"
            className={`details-body__button ${
              bookmarkStatus ? "details-body__button--activated" : ""
            }`}
            onClick={handleBookmarkClick}
          >
            <i
              role="img"
              aria-label="북마크"
              className={`icon-bookmark${bookmarkStatus ? "" : "_outline"}`}
            />
          </button>
          <button
            type="button"
            className={`details-body__button ${
              likesStatus ? "details-body__button--activated" : ""
            }`}
            onClick={handleLikesClick}
          >
            <span>{selected?.gather.likes}</span>
            <i
              role="img"
              aria-label="좋아요"
              className={`icon-thumb_up${
                likesStatus ? " details-header__likes--true" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <Comments />
    </>
  );
}

export function PostDetails() {
  const [likesStatus, setLikesStatus] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);

  const selected = useApi(dummyPostResponse);

  // response.find((post) => post._id === params.id);

  // useEffect(() => {}, [likesStatus, bookmarkStatus]);

  function handleBookmarkClick() {
    setBookmarkStatus(!bookmarkStatus);
  }

  function handleLikesClick() {
    setLikesStatus(!likesStatus);
    // TODO: put?patch? 통신하여 likesStatus에 따라 증가/감소값 넘겨주기 (id건네주어서 해당 db값 변경)
    // 참고: async function postTopic(evt) {
    //   const response = await fetch('http://localhost:3000/topics/', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    // body: JSON.stringify({ _id: , likes: selected +-1 })
    //   });
    //   const result = await response.json();
    //   return result;
    // }
  }

  return (
    <>
      <div className="details-header">
        <h2 className="details-header__title">{selected?.post.title}</h2>
        <div className="details-header__contents">
          <div className="details-header__subject">
            {selected?.post.subject}
          </div>
          <div className="details-header__author">{selected?.post.author}</div>
          <div className="details-header__created">
            {formatToReadableTime(selected?.post.createdAt || "")}
          </div>
          <div className="details-header__views">
            <i className="icon-visibility" role="img" aria-label="조회 수" />
            {selected?.post.views}
          </div>
        </div>
      </div>
      <div className="details-body">
        <div className="details-body__article">
          <MarkdownViewer
            value={selected?.post.contents || ""}
            className="details-body__content"
          />
        </div>
        <div className="details-body__buttons">
          <button
            type="button"
            className={`details-body__button ${
              bookmarkStatus ? "details-body__button--activated" : ""
            }`}
            onClick={handleBookmarkClick}
          >
            <i
              role="img"
              aria-label="북마크"
              className={`icon-bookmark${bookmarkStatus ? "" : "_outline"}`}
            />
          </button>
          <button
            type="button"
            className={`details-body__button ${
              likesStatus ? "details-body__button--activated" : ""
            }`}
            onClick={handleLikesClick}
          >
            <span>{selected?.post.likes}</span>
            <i
              role="img"
              aria-label="좋아요"
              className={`icon-thumb_up${
                likesStatus ? " details-header__likes--true" : ""
              }`}
            />
          </button>
        </div>
      </div>
      <Comments />
    </>
  );
}
