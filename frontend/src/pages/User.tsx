/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useApi } from "../api";
import {
  dummyCommentsResponse,
  dummyGathersResponse,
  dummyPostsResponse,
  dummyUser,
} from "../api/dummy";
import Button from "../components/Button";
import { Input } from "../components/Input";
import Navigation from "../components/Navigation";
import { useAuth } from "../data/Auth";
import "./User.css";

export function UserInfo() {
  const { group } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth?.user;

  if (!user) return <>{navigate("/login")}</>;

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const { googleId, nickname, track, gitlab } = user;

  const selectedUser = useApi(dummyUser);

  useEffect(() => {
    setName(user.name);
  }, [editMode]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: 데이터 수정(event.target..value)
    setEditMode(!editMode);
  }
  function handleToggleClick() {
    setEditMode(!editMode);
  }

  return (
    <form className="user-info" onSubmit={handleSubmit}>
      <div className="user-info__image">
        <img
          src={selectedUser?.profile}
          alt={`${selectedUser?.profile}님의 이미지`}
        />
      </div>
      <Input id="googleId" label="구글 ID" name="googleId" value={googleId} />
      <Input id="nickname" label="닉네임" name="nickname" value={nickname} />
      {/* TODO: 수정 가능한 요소 하이라이팅 방법 생각 */}
      <Input
        id="name"
        label={`이름${editMode ? " (수정 가능)" : ""}`}
        value={name}
        setValue={setName}
        readOnly={!editMode}
      />
      <Input id="track" label="트랙" value={track} />
      <Input id="gitlab" label="GitLab 주소" name="gitlab" value={gitlab} />
      <div className="btns">
        <div
          role="button"
          tabIndex={0}
          onClick={handleToggleClick}
          onKeyPress={handleToggleClick}
        >
          <Button type="button" value={`${editMode ? "취소" : "수정"}하기`} />
        </div>
        {editMode && <Button type="submit" value="수정완료" />}
      </div>
    </form>
  );
}

export function UserPosts() {
  const posts = useApi(dummyPostsResponse);
  // TODO: 작업한 컴포넌트 활용해 렌더링
  return <div>작성한 글</div>;
}

export function UserGatherPosts() {
  const gathers = useApi(dummyGathersResponse);
  // TODO: 작업한 컴포넌트 활용해 렌더링
  return <div>작성한 모집글</div>;
}

export function UserComments() {
  const comments = useApi(dummyCommentsResponse);
  // TODO: 작업한 컴포넌트 활용해 렌더링
  return <div>작성한 댓글</div>;
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
          { title: "포스트", to: "posts" },
          { title: "모집글", to: "gathers" },
          { title: "댓글", to: "comments" },
          { title: "북마크", to: "bookmarks" },
          // TODO: 모집 글 추가 여부 고민
        ]}
        align="center"
      />
      <Outlet />
    </div>
  );
}
