import { useState } from "react";
import { Navigate } from "react-router-dom";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/auth";
import copyToClipboard from "../utils/clipboard";
import "./Authorize.css";

export default function Authorize() {
  const [gitlabName, setGitlabName] = useState("");
  const auth = useAuth();
  const user = auth?.user;

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="authorize">
      <h1>레이서 인증 🔑</h1>
      <blockquote className="authorize__blockquote">
        <p>
          {user.name} 님의 개인 키는{" "}
          <button
            type="button"
            className="authorize__button"
            onClick={() => copyToClipboard(`${user.authKey}`)}
          >
            {user.authKey}
          </button>
          입니다.
        </p>
        <p>
          키를 클릭해 복사한 뒤{" "}
          <a
            href="https://kdt-gitlab.elice.io/sw_track/class_01/project_2/team3/auth"
            target="_blank"
            rel="noreferrer noopener"
            className="authorize__link"
          >
            레이서 인증 저장소
          </a>
          의 <code>README.md</code>를 확인해주세요.
        </p>
        <p>
          모든 인증 과정이 끝난 뒤, 본인의 Gitlab 유저 명을 아래{" "}
          <code>Input</code>에 입력하고, <code>인증 요청</code> 버튼을
          클릭해주세요!
        </p>
      </blockquote>
      <form
        className="authorize__form"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Input
          id="gitlab-name"
          value={gitlabName}
          setValue={setGitlabName}
          label="Gitlab 유저명"
        />
        <Button type="submit" value="인증 요청" />
      </form>
    </div>
  );
}
