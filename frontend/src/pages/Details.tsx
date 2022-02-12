import { useEffect, useState } from "react";
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
  const [clapped, setClapped] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [numBookmark, setNumBookmark] = useState<number>(0);
  const [numClap, setNumClap] = useState<number>(0);
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/404" />;
  }
  const [response, setResponse] = useState<IGatherPostResponse>();
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleBookmarkClick() {
    if (auth?.user && id) {
      if (bookmarked) {
        removeBookmark({ id, token: auth?.user.token });
        setNumBookmark(numBookmark - 1);
      } else {
        addBookmark({ id, token: auth?.user.token });
        setNumBookmark(numBookmark + 1);
      }

      setBookmarked(!bookmarked);
      return;
    }

    navigate("/login");
  }

  async function handleLikesClick() {
    if (auth?.user && id) {
      if (clapped) {
        removeClap({ id, token: auth?.user.token });
        setNumClap(numClap - 1);
      } else {
        addClap({ id, token: auth?.user.token });
        setNumClap(numClap + 1);
      }

      setClapped(!clapped);
      return;
    }

    navigate("/login");
  }

  useEffect(() => {
    async function handleAsync() {
      const apiResponse = await useApi(
        getPost<IGatherPostResponse>(`${id}`, `${auth?.user?.token}`)
      );

      if (!apiResponse) {
        navigate("/");
        return;
      }

      setResponse(apiResponse);
      setBookmarked(!!apiResponse.post.isBookmarked);
      setClapped(!!apiResponse.post.isLiked);
      setNumBookmark(apiResponse.post.bookmarks);
      setNumClap(apiResponse.post.likes);
    }

    handleAsync();
  }, []);

  return (
    <>
      <header className="details-header">
        <h1 className="main-title details-header__title">
          {response?.post.title}
        </h1>
        <div className="details-header__contents">
          <div className="details-header__author">{response?.post.author}</div>
          <time
            className="details-header__created"
            dateTime={response?.post.createdAt || ""}
          >
            {formatToReadableTime(response?.post.createdAt || "")}
          </time>
          <div className="details-header__views">
            <i className="icon-visibility" role="img" aria-label="조회 수" />
            {response?.post.views}
          </div>
        </div>
      </header>
      <div className="details-body">
        <article className="details-body__article">
          <div className="details-body__tags">
            {response?.post.tags.map((tag) => (
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
            상태: 모집 {`${response?.post.isCompleted ? "완료" : "중"}`}
          </div>
          <div className="details-body__info">
            <i className="icon-desktop_windows" />
            장소: {response?.post.area}
          </div>
          <div className="details-body__info">
            <i className="icon-person" />
            인원: {response?.post.members.length}명
          </div>
          <MarkdownViewer
            value={response?.post.contents || ""}
            className="details-body__content"
          />
          <div className="details-body__members member-list">
            <h3 className="member-list__title">현재 팀원</h3>
            <ul className="member-list__container">
              {response?.post.members.map((member: IMemberProps) => (
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
              bookmarked && "details-body__button--activated",
              numBookmark === 0 && "details-body__button--num-hidden"
            )}
            onClick={handleBookmarkClick}
          >
            <span>{numBookmark}</span>
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
              clapped && "details-body__button--activated",
              numClap === 0 && "details-body__button--num-hidden"
            )}
            onClick={handleLikesClick}
          >
            <span>{numClap}</span>
            <Clap activated={clapped} />
          </button>
        </div>
      </div>
      {response && <Comments postId={response.post._id} />}
    </>
  );
}

export function PostDetails() {
  const [clapped, setClapped] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [numBookmark, setNumBookmark] = useState<number>(0);
  const [numClap, setNumClap] = useState<number>(0);
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/404" />;
  }
  const [response, setResponse] = useState<IPostResponse>();
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleBookmarkClick() {
    if (auth?.user && id) {
      if (bookmarked) {
        removeBookmark({ id, token: auth?.user.token });
        setNumBookmark(numBookmark - 1);
      } else {
        addBookmark({ id, token: auth?.user.token });
        setNumBookmark(numBookmark + 1);
      }

      setBookmarked(!bookmarked);
      return;
    }

    navigate("/login");
  }

  async function handleLikesClick() {
    if (auth?.user && id) {
      if (clapped) {
        removeClap({ id, token: auth?.user.token });
        setNumClap(numClap - 1);
      } else {
        addClap({ id, token: auth?.user.token });
        setNumClap(numClap + 1);
      }

      setClapped(!clapped);
      return;
    }

    navigate("/login");
  }

  useEffect(() => {
    async function handleAsync() {
      const apiResponse = await useApi(
        getPost<IPostResponse>(`${id}`, `${auth?.user?.token}`)
      );

      if (!apiResponse) {
        navigate("/");
        return;
      }

      setResponse(apiResponse);
      setBookmarked(!!apiResponse.post.isBookmarked);
      setClapped(!!apiResponse.post.isLiked);
      setNumBookmark(apiResponse.post.bookmarks);
      setNumClap(apiResponse.post.likes);
    }

    handleAsync();
  }, []);

  return (
    <>
      <div className="details-header">
        <h1 className="main-title details-header__title">
          {response?.post.title}
        </h1>
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
              bookmarked && "details-body__button--activated",
              numBookmark === 0 && "details-body__button--num-hidden"
            )}
            onClick={handleBookmarkClick}
          >
            <span>{numBookmark}</span>
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
              clapped && "details-body__button--activated",
              numClap === 0 && "details-body__button--num-hidden"
            )}
            onClick={handleLikesClick}
          >
            <span>{numClap}</span>
            <Clap activated={clapped} />
          </button>
        </div>
      </div>
      {response && <Comments postId={response.post._id} />}
    </>
  );
}
