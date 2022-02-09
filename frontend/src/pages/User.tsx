/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
import useApi from "../hooks/api";
import { dummyUser } from "../api/dummy";
import Button from "../components/Button";
import { Input } from "../components/Input";
import Navigation from "../components/Navigation";
import { useAuth } from "../hooks/auth";
import "./User.css";

export function UserInfo() {
  const { group } = useParams();
  const auth = useAuth();
  const user = auth?.user;

  if (!user) return <Navigate to="/login" />;

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const { nickname, track, gitlab } = user;
  const isAuthorized = !user.authKey && !!user.gitlab;

  const selectedUser = useApi(dummyUser);

  useEffect(() => {
    setName(user.name);
  }, [editMode]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: 데이터 수정(event.target..value)
    setEditMode(false);
  }

  return (
    <form className="user-info" onSubmit={handleSubmit}>
      <div className="user-info__image">
        <img
          src={selectedUser?.profile}
          alt={`${selectedUser?.profile}님의 이미지`}
        />
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
        <Input id="nickname" label="닉네임" name="nickname" value={nickname} />
      </div>
      {/* TODO: 수정 가능한 요소 하이라이팅 방법 생각 */}
      <div className="user-info__content">
        <Input
          id="name"
          label={`이름${editMode ? " (수정 가능)" : ""}`}
          value={name}
          setValue={setName}
          readOnly={!editMode}
        />
      </div>
      {isAuthorized && (
        <>
          <div className="user-info__content">
            <Input id="track" label="트랙" value={track} />
          </div>
          <div className="user-info__content">
            <Input
              id="gitlab"
              label="GitLab 주소"
              name="gitlab"
              value={gitlab}
            />
          </div>
        </>
      )}
      <div className="user-info__content user-info__buttons">
        {editMode ? (
          <>
            <Button
              type="button"
              buttonStyle="warning"
              onClick={() => {
                setEditMode(false);
              }}
              value="취소하기"
            />
            <Button type="submit" value="수정완료" />
          </>
        ) : (
          <Button
            type="button"
            onClick={() => {
              setEditMode(true);
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
  return <div>북마크한 글</div>;
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
