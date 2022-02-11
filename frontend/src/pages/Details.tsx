import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/api";
import { formatToReadableTime } from "../utils/time";
import MarkdownViewer from "../components/MarkdownViewer";
import Comments from "../components/Comments";
import formatClassName from "../utils/formatClassName";
import Clap from "../components/Clap";
import {
  addBookmark,
  addClap,
  getPost,
  removeBookmark,
  removeClap,
} from "../api";
import { useAuth } from "../hooks/auth";
import "./Details.css";

export function GatherDetails() {
  const [clapped, setClapped] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/404" />;
  }
  const response = useApi(getPost<IGatherPostResponse>(id));
  const navigate = useNavigate();
  const auth = useAuth();

  function handleBookmarkClick() {
    if (auth?.user && id) {
      if (bookmarked) {
        removeBookmark({ id, token: auth?.user.token });
      } else {
        addBookmark({ id, token: auth?.user.token });
      }

      setBookmarked(!bookmarked);
      return;
    }

    navigate("/login");
  }

  function handleLikesClick() {
    if (auth?.user && id) {
      if (clapped) {
        removeClap({ id, token: auth?.user.token });
      } else {
        addClap({ id, token: auth?.user.token });
      }

      setClapped(!clapped);
      return;
    }

    navigate("/login");
  }

  if (response && !response.isOk) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header className="details-header">
        <h2 className="details-header__title">{response?.gather.title}</h2>
        <div className="details-header__contents">
          <div className="details-header__author">
            {response?.gather.author}
          </div>
          <time
            className="details-header__created"
            dateTime={response?.gather.createdAt || ""}
          >
            {formatToReadableTime(response?.gather.createdAt || "")}
          </time>
          <div className="details-header__views">
            <i className="icon-visibility" role="img" aria-label="조회 수" />
            {response?.gather.views}
          </div>
        </div>
      </header>
      <div className="details-body">
        <article className="details-body__article">
          <div className="details-body__tags">
            {response?.gather.tags.map((tag) => (
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
            상태: 모집 {`${response?.gather.isCompleted ? "완료" : "중"}`}
          </div>
          <div className="details-body__info">
            <i className="icon-desktop_windows" />
            장소: {response?.gather.area}
          </div>
          <div className="details-body__info">
            <i className="icon-person" />
            인원: {response?.gather.members.length}명
          </div>
          <MarkdownViewer
            value={response?.gather.contents || ""}
            className="details-body__content"
          />
          <div className="details-body__members member-list">
            <h3 className="member-list__title">현재 팀원</h3>
            <ul className="member-list__container">
              {response?.gather.members.map((member: IMemberProps) => (
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
            className={formatClassName(
              "details-body__button",
              bookmarked && "details-body__button--activated"
            )}
            onClick={handleBookmarkClick}
          >
            <i
              role="img"
              aria-label="북마크"
              className={`${
                bookmarked ? "icon-bookmark" : "icon-bookmark_outline"
              }`}
            />
          </button>
          <button
            type="button"
            className={formatClassName(
              "details-body__button",
              clapped && "details-body__button--activated"
            )}
            onClick={handleLikesClick}
          >
            <span>{response?.gather.likes}</span>
            <Clap activated={clapped} />
          </button>
        </div>
      </div>
      <Comments />
    </>
  );
}

export function PostDetails() {
  const [clapped, setClapped] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/404" />;
  }
  const response = useApi(getPost<IPostResponse>(id));
  const navigate = useNavigate();
  const auth = useAuth();

  function handleBookmarkClick() {
    if (auth?.user && id) {
      if (bookmarked) {
        removeBookmark({ id, token: auth?.user.token });
      } else {
        addBookmark({ id, token: auth?.user.token });
      }

      setBookmarked(!bookmarked);
      return;
    }

    navigate("/login");
  }

  function handleLikesClick() {
    if (auth?.user && id) {
      if (clapped) {
        removeClap({ id, token: auth?.user.token });
      } else {
        addClap({ id, token: auth?.user.token });
      }

      setClapped(!clapped);
      return;
    }

    navigate("/login");
  }

  if (response && !response.isOk) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="details-header">
        <h2 className="details-header__title">{response?.post.title}</h2>
        <div className="details-header__contents">
          <div className="details-header__subject">
            {response?.post.subject}
          </div>
          <div className="details-header__author">{response?.post.author}</div>
          <div className="details-header__created">
            {formatToReadableTime(response?.post.createdAt || "")}
          </div>
          <div className="details-header__views">
            <i className="icon-visibility" role="img" aria-label="조회 수" />
            {response?.post.views}
          </div>
        </div>
      </div>
      <div className="details-body">
        <div className="details-body__article">
          <MarkdownViewer
            value={response?.post.contents || ""}
            className="details-body__content"
          />
        </div>
        <div className="details-body__buttons">
          <button
            type="button"
            className={formatClassName(
              "details-body__button",
              bookmarked && "details-body__button--activated"
            )}
            onClick={handleBookmarkClick}
          >
            <i
              role="img"
              aria-label="북마크"
              className={`${
                bookmarked ? "icon-bookmark" : "icon-bookmark_outline"
              }`}
            />
          </button>
          <button
            type="button"
            className={formatClassName(
              "details-body__button",
              clapped && "details-body__button--activated"
            )}
            onClick={handleLikesClick}
          >
            <span>{response?.post.likes}</span>
            <Clap activated={clapped} />
          </button>
        </div>
      </div>
      <Comments />
    </>
  );
}
