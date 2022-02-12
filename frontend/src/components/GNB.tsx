import { Link } from "react-router-dom";
import favicon from "../../static/image/favicon.svg";
import ThemeSwitch from "./ThemeSwitch";
import Dropdown from "./Dropdown";
import { useAuth } from "../hooks/auth";
import "./GNB.css";

export default function GlobalNavigationBar() {
  const auth = useAuth();

  return (
    <nav className="gnb">
      <div className="gnb__grow">
        <Link to="/" className="gnb__button">
          <img
            src={favicon}
            width={40}
            height={40}
            alt="로고"
            className="gnb__logo"
          />
        </Link>
      </div>
      <div className="gnb__grow gnb__grow--right">
        <ThemeSwitch />
        <Dropdown
          ButtonChildren={
            <i role="img" aria-label="알림" className="icon-notifications" />
          }
          ContentChildren={
            <>
              <h4>알림 목록</h4>
              {/* TODO: 알림 목록 구현 */}
              <ul>
                <li>알림</li>
              </ul>
            </>
          }
        />
        {auth?.user ? (
          <Dropdown
            ButtonChildren={<img src={favicon} alt="유저 프로필" />}
            ContentChildren={
              <>
                {/* TODO: 유저 정보 추가 */}
                <img
                  src={auth?.user ? auth.user.profile : favicon}
                  alt="유저 프로필"
                />
                <div>
                  <div>
                    <Link to="/user">정보 수정</Link>
                  </div>
                  <div>로그아웃</div>
                </div>
              </>
            }
          />
        ) : (
          <a className="gnb__sign-in" href="/api/auth/google">
            로그인
          </a>
        )}
      </div>
    </nav>
  );
}
