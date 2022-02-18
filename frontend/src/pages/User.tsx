/* eslint-disable no-underscore-dangle */
import { useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { updateMyInfo } from "../api";
import Button from "../components/Button";
import { Input } from "../components/Input";
import Loader from "../components/Loader";
import Navigation from "../components/Navigation";
import useApi from "../hooks/api";
import { useAuth } from "../hooks/auth";
import formatClassName from "../utils/formatClassName";
import "./User.css";

export function UserInfo() {
  const auth = useAuth();
  const user = auth?.user;

  if (!window.token) return <Navigate to="/login" />;

  if (!user) {
    return <Loader />;
  }

  const [editing, setEditing] = useState(false);
  const {
    name,
    nickname: _nickname,
    track: _track,
    github: _github,
    grade,
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
        <img src={user.profile} alt={`${user.name}님의 이미지`} />
      </div>
      {!isAuthorized && (
        <div className="user-info__content">
          <blockquote className="user-info__blockquote">
            아직 레이서 인증이 완료되지 않았습니다.{" "}
            <Link to="/authorize">인증 페이지</Link>에서 인증을 완료해주세요!
          </blockquote>
        </div>
      )}
      <div className="user-info__content user-info__content--readonly">
        <Input id="name" label="이름" value={name} readOnly />
      </div>
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
  // TODO: 작업한 컴포넌트 활용해 렌더링
  // TODO: 일반 글과 모집 글 분류 방식 고민
  return <div className="user-info">북마크한 글</div>;
}

export default function User() {
  return (
    <div>
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
