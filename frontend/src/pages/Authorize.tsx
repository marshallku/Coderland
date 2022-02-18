import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/auth";
import { authorizeUser, getUserAuthKey } from "../api/user";
import copyToClipboard from "../utils/clipboard";
import toast from "../utils/toast";
import "./Authorize.css";
import useApi from "../hooks/api";
import { getMyInfo } from "../api";

export default function Authorize() {
  const [authKey, setAuthKey] = useState("");
  const [gitlabName, setGitlabName] = useState("");
  const auth = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" />;

  useEffect(() => {
    const init = async () => {
      const response = await getUserAuthKey();

      if (response.isOk === false) {
        toast("인증 키를 불러오는 데 실패했습니다");
        return;
      }

      setAuthKey(response.authKey);
    };
    init();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await useApi(
      authorizeUser({
        username: gitlabName,
      })
    );

    if (!response) {
      return;
    }

    const newUserApiRequest = await useApi(getMyInfo());

    if (!newUserApiRequest) {
      return;
    }

    auth.update(newUserApiRequest.user);

    navigate("/user");
  };

  return (
    <div className="authorize">
      <h1>레이서 인증 🔑</h1>
      <blockquote className="authorize__blockquote">
        <p>
          {user.name} 님의 개인 키는{" "}
          <button
            type="button"
            className="authorize__button"
            onClick={() => copyToClipboard(`${authKey}`)}
          >
            <code>{authKey}</code>
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
      <form className="authorize__form" onSubmit={handleSubmit}>
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
