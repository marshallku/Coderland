import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import favicon from "../../static/image/favicon.svg";
import ThemeSwitch from "./ThemeSwitch";
import Dropdown from "./Dropdown";
import formatClassName from "../utils/formatClassName";
import { useAuth } from "../hooks/auth";
import "./GNB.css";

export default function GlobalNavigationBar({
  drawerRevealed,
  setDrawerRevealed,
}: IDrawerStatusProps) {
  const auth = useAuth();
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false);

  useEffect(() => {
    window.setHasNewNotification = setHasNewNotification;
  }, []);

  return (
    <nav className="gnb">
      <div className="gnb__grow">
        <button
          type="button"
          className={formatClassName(
            "hbg",
            "gnb__button",
            drawerRevealed && "hbg--activated"
          )}
          aria-label="드로어 열기"
          onClick={() => setDrawerRevealed(!drawerRevealed)}
        >
          <div className="hbg__line hbg__line--top" />
          <div className="hbg__line hbg__line--mid" />
          <div className="hbg__line hbg__line--bot" />
        </button>
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
            <>
              <i
                role="img"
                aria-label={formatClassName(
                  "알림",
                  hasNewNotification && "(새 알림 존재)"
                )}
                className={formatClassName(
                  "icon-notifications",
                  hasNewNotification && "new-notification"
                )}
              />
              {hasNewNotification && <div className="gnb__circle" />}
            </>
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
