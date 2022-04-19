import { useCallback, useEffect, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store";
import useApi from "../hooks/api";
import { getBookmarkedPost, updateMyInfo } from "../api";
import Button from "../components/Button";
import DisplayError from "../components/DisplayError";
import { Input } from "../components/Input";
import Loader from "../components/Loader";
import Navigation from "../components/Navigation";
import Pagination from "../components/Pagination";
import PostListItem, { PostListItemSkeleton } from "../components/PostListItem";
import { SKELETONS_LENGTH } from "../components/PostList";
import formatClassName from "../utils/formatClassName";
import { parseQuery } from "../utils/url";
import "./User.css";

export function UserInfo() {
  const { user, token } = useAuthStore.getState();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Loader />;
  }

  const [editing, setEditing] = useState(false);
  const {
    nickname: _nickname,
    track: _track,
    github: _github,
    grade,
    profile,
    name,
  } = user;
  const [nickname, setNickname] = useState(_nickname);
  const [track, setTrack] = useState(_track);
  const [github, setGithub] = useState(_github);
  const isAuthorized = grade > 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await useApi(updateMyInfo({ nickname, track, github }));

    if (!response) {
      return;
    }

    setEditing(false);
  };

  return (
    <form
      className={formatClassName("user-info", editing && "user-info--editing")}
      onSubmit={handleSubmit}
    >
      <div className="user-info__image">
        <img src={profile} alt={`${name}님의 이미지`} />
      </div>
      {!isAuthorized && (
        <div className="user-info__content">
          <blockquote className="user-info__blockquote">
            아직 레이서 인증이 완료되지 않았습니다.{" "}
            <Link to="/authorize">인증 페이지</Link>에서 인증을 완료해주세요!
          </blockquote>
        </div>
      )}
      <div className="user-info__content">
        <Input
          id="nickname"
          label="닉네임"
          name="nickname"
          value={nickname}
          autoComplete="off"
          autoCapitalize="off"
          setValue={setNickname}
          readOnly={!editing}
        />
      </div>
      {isAuthorized && (
        <>
          <div className="user-info__content">
            <Input
              id="track"
              label="트랙"
              value={track}
              autoComplete="off"
              autoCapitalize="off"
              setValue={setTrack}
              readOnly={!editing}
            />
          </div>
          <div className="user-info__content">
            <Input
              id="github"
              label="Github 주소"
              name="github"
              autoComplete="off"
              autoCapitalize="off"
              value={github}
              setValue={setGithub}
              readOnly={!editing}
            />
          </div>
        </>
      )}
      <div className="user-info__content user-info__buttons">
        {editing ? (
          <>
            <Button
              type="button"
              buttonStyle="warning"
              onClick={() => {
                setEditing(false);
              }}
              value="취소하기"
            />
            <Button type="submit" value="수정완료" />
          </>
        ) : (
          <Button
            type="button"
            onClick={() => {
              setEditing(true);
            }}
            value="수정하기"
          />
        )}
      </div>
    </form>
  );
}

export function UserBookmarks() {
  const location = useLocation();
  const { page } = parseQuery(location.search);
  const [response, setResponse] = useState<IPostListResponse>();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page || 1 : 1);
  const ListOfElements = useCallback(() => {
    if (response) {
      if (response.posts.length === 0) {
        return <DisplayError message="아직 아무런 글이 없어요" />;
      }

      return (response.posts as Array<IPostInList>).map(PostListItem);
    }

    const tmpArray = Array.from({ length: SKELETONS_LENGTH });

    // eslint-disable-next-line react/no-array-index-key
    return tmpArray.map((_, i) => <PostListItemSkeleton key={i} />);
  }, [response]);

  const paginate = useCallback((pageNumber: number) => {
    location.search = `?page=${pageNumber}`;
  }, []);

  useEffect(() => {
    async function getPostList() {
      const apiResponse = await useApi(
        getBookmarkedPost({ page: currentPage })
      );

      setResponse(apiResponse);
    }

    getPostList();
  }, [currentPage]);

  useEffect(() => {
    const { page: current } = parseQuery(location.search);

    setCurrentPage(current ? +current || 1 : 1);
  }, [location.search]);

  return (
    <>
      <div className="post-list post-list--list">{ListOfElements()}</div>
      {response && (
        <Pagination paginate={paginate} data={response.pagination} />
      )}
    </>
  );
}

export default function User() {
  return (
    <div className="user">
      <Navigation
        list={[
          { title: "기본정보", to: "" },
          { title: "북마크", to: "bookmarks" },
        ]}
        align="center"
      />
      <Outlet />
    </div>
  );
}
