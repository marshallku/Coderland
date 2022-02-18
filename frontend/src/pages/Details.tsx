import { useEffect, useState, useCallback, useRef } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/api";
import { formatToReadableTime } from "../utils/time";
import MarkdownViewer from "../components/MarkdownViewer";
import Comments from "../components/Comments";
import formatClassName from "../utils/formatClassName";
import Clap from "../components/Clap";
import {
  addBookmark,
  addClap,
  deletePost,
  getPost,
  removeBookmark,
  removeClap,
} from "../api";
import { useAuth } from "../hooks/auth";
import { useModal } from "../hooks/modal";
import "./Details.css";
import { debounce } from "../utils/optimizer";
import { scrollHorizontal } from "../animation/scroll";

function MemberList({ data }: IMemberListProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerOffsetWidth, setContainerOffsetWidth] = useState(0);

  const handleResize = debounce(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    setScrollX(current.scrollLeft);
    setContainerWidth(current.scrollWidth);
    setContainerOffsetWidth(current.offsetWidth);
  });

  const handleScroll = () => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    setScrollX(current.scrollLeft);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, [scrollX, containerWidth]);

  useEffect(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    current.addEventListener("scroll", handleScroll, { passive: true });

    // eslint-disable-next-line consistent-return
    return () => {
      current.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef.current]);

  return (
    <div className="gather-members">
      <button
        type="button"
        className="gather-members__button gather-members__button--west"
        disabled={scrollX === 0}
        onClick={() => {
          scrollHorizontal(containerRef.current, scrollX, scrollX - 100);
        }}
      >
        <i className="icon-west" />
      </button>
      <ul className="gather-members__list" ref={containerRef}>
        {data.map((member) => (
          <li key={member.nickname} className="gather-members__item">
            <img src={member.profile} alt={`${member.nickname}님의 이미지`} />
            <h4>{member.nickname}</h4>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="gather-members__button gather-members__button--east"
        disabled={containerWidth - containerOffsetWidth <= scrollX}
        onClick={() => {
          scrollHorizontal(containerRef.current, scrollX, scrollX + 100);
        }}
      >
        <i className="icon-east" />
      </button>
    </div>
  );
}

export default function Details<
  T extends IGatherPostResponse | IPostResponse
>() {
  const [clapped, setClapped] = useState<boolean>(false);
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [numBookmark, setNumBookmark] = useState<number>(0);
  const [numClap, setNumClap] = useState<number>(0);
  const { id } = useParams();
  if (!id) {
    return <Navigate to="/404" />;
  }
  const [response, setResponse] = useState<T>();
  const navigate = useNavigate();
  const auth = useAuth();
  const modal = useModal();

  async function handleBookmarkClick() {
    if (auth?.user && id) {
      if (bookmarked) {
        removeBookmark({ id });
        setNumBookmark(numBookmark - 1);
      } else {
        addBookmark({ id });
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
        removeClap({ id });
        setNumClap(numClap - 1);
      } else {
        addClap({ id });
        setNumClap(numClap + 1);
      }

      setClapped(!clapped);
      return;
    }

    navigate("/login");
  }

  async function handleApi() {
    const apiResponse = await useApi(getPost<T>(`${id}`));

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

  const updatePost = useCallback(() => {
    handleApi();
  }, []);

  useEffect(() => {
    handleApi();
  }, []);

  return (
    <>
      <header className="details-header">
        <h1 className="main-title details-header__title">
          {response?.post.title}
        </h1>
        <div className="details-header__contents">
          <span className="details-header__views">
            조회 수 {response?.post.views}
          </span>
          <span className="details-header__dot" />
          <time
            className="details-header__created"
            dateTime={response?.post.createdAt || ""}
          >
            {formatToReadableTime(response?.post.createdAt || "")}
          </time>
          <span className="details-header__dot" />
          <span className="details-header__author">
            by <span>{response?.post.author.nickname}</span>
          </span>
        </div>
        {!!response?.post.isAuthor && (
          <div className="details-header__control">
            <Link
              to={`/write/${response.post.subject}${
                "category" in response.post ? `/${response.post.category}` : ""
              }`}
              state={response.post}
            >
              <i className="icon-create" role="img" aria-label="수정" />
            </Link>
            <button
              type="button"
              onClick={() => {
                modal?.openModal("정말 삭제하시겠습니까?", async () => {
                  if (!response.post || !auth?.user || !window.token) {
                    return;
                  }

                  const apiResponse = await useApi(
                    deletePost({
                      id: response.post._id,
                    })
                  );

                  if (!apiResponse) {
                    return;
                  }

                  navigate("/");
                });
              }}
            >
              <i className="icon-delete" role="img" aria-label="삭제" />
            </button>
          </div>
        )}
      </header>
      {response?.post && "tags" in response.post && (
        <header className="gather-info">
          <h3 className="gather-info__title">기술 스택</h3>
          <div className="gather-info__tags">
            {response.post.tags.map((tag) => (
              <i
                key={tag}
                className={`icon-${tag}`}
                role="img"
                aria-label={tag}
              />
            ))}
          </div>
          <h3 className="gather-info__title">기타 정보</h3>
          <div className="gather-info__statuses">
            <div className="gather-info__status">
              <i className="icon-info_outline" />
              상태: {`${response.post.isCompleted ? "모집 완료" : "모집 중"}`}
            </div>
            <div className="gather-info__status">
              <i className="icon-desktop_windows" />
              장소: {response.post.area}
            </div>
            <div className="gather-info__status">
              <i className="icon-person" />
              인원: {response.post.members.length}명
            </div>
          </div>
          {response.post.members.length > 0 && (
            <>
              <h3 className="gather-info__title">현재 팀원</h3>
              <MemberList data={response.post.members} />
            </>
          )}
        </header>
      )}
      <div className="details-body">
        <article className="details-body__article">
          <MarkdownViewer
            value={response?.post.contents || ""}
            className="details-body__content"
          />
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
      {response && (
        <Comments
          updatePost={updatePost}
          isAuthor={response.post.isAuthor}
          members={"tags" in response.post ? response.post.members : undefined}
          postId={response.post._id}
        />
      )}
    </>
  );
}
