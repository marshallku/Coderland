/* eslint-disable no-underscore-dangle */
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  dummyCommentsResponse,
  dummyGathersResponse,
  dummyPostsResponse,
  dummyUser,
} from "../api/dummy";
import { Input } from "./Input";
import Button from "./Button";
import useApi from "../api/useApi";
import "./GroupInUser.css";
import { useAuth } from "../data/Auth";

export default function GroupInUser() {
  const { group } = useParams();
  const { user } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [googleId, setGoogleId] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const [track, setTrack] = useState("");
  const [gitlab, setGitlab] = useState("");

  const selectedUser = useApi(dummyUser);
  const posts = useApi(dummyPostsResponse);
  const gathers = useApi(dummyGathersResponse);
  const comments = useApi(dummyCommentsResponse);

  useEffect(() => {
    setGoogleId(user?.googleId || "");
    setNickname(user?.nickname || "");
    setName(user?.name || "");
    setTrack(user?.track || "");
    setGitlab(user?.gitlab || "");
  }, [editMode]);

  // TODO: id, group값으로 해당 유저 찾기
  // const { id, group } = useParams();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: 데이터 수정(event.target..value)
    setEditMode(!editMode);
  }
  function handleToggleClick() {
    setEditMode(!editMode);
  }

  const infoTags = (
    <form className="user-info" onSubmit={handleSubmit}>
      <div className="user-info__image">
        <img
          src={selectedUser?.profile}
          alt={`${selectedUser?.profile}님의 이미지`}
        />
      </div>
      <Input
        id="googleId"
        label="구글 ID"
        name="googleId"
        value={googleId}
        setValue={setGoogleId}
        readOnly={!editMode}
      />
      <Input
        id="nickname"
        label="닉네임"
        name="nickname"
        value={nickname}
        setValue={setNickname}
        readOnly={!editMode}
      />
      <Input
        id="name"
        label="이름"
        value={name}
        setValue={setName}
        readOnly={!editMode}
      />
      <Input
        id="track"
        label="트랙"
        value={track}
        setValue={setTrack}
        readOnly={!editMode}
      />
      <Input
        id="gitlab"
        label="GitLab 주소"
        name="gitlab"
        value={gitlab}
        setValue={setGitlab}
        readOnly={!editMode}
      />
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

  function findByAuthor(
    data: Array<Omit<IPost, "contents" | "subject"> | IGatherPost>,
    author: string
  ) {
    const foundData = data
      .filter((item) => item.author === author)
      .map((item) => (
        <li key={item._id}>
          <Link to={`/${group}s/${item._id}`}>{item.title}</Link>
        </li>
      ));
    return foundData;
  }

  const otherTags = (
    <div className="user-write">
      <ul>
        {group === "post" && posts && findByAuthor(posts.posts, "도도새")}
        {group === "gather" &&
          gathers &&
          findByAuthor(gathers.posts, "체셔 고양이")}
        {group === "comment" &&
          comments?.comments
            .filter((item) => item.author === "하트 여왕")
            .map((item) => (
              <li key={item._id}>
                <Link to={`/${group}s/${item._id}`}>{item.contents}</Link>
              </li>
            ))}
        {/* TODO: 댓글 보여주는 방식 및 링크 고민 */}
      </ul>
    </div>
  );

  return <div>{group === "info" ? infoTags : otherTags}</div>;
}
