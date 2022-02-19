import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-256.png";
import ThemeSwitch from "./ThemeSwitch";
import Dropdown from "./Dropdown";
import formatClassName from "../utils/formatClassName";
import { useAuth } from "../hooks/auth";
import useApi from "../hooks/api";
import { getNotification } from "../api";
import SubscribeButton from "./SubscribeButton";
import "./GNB.css";

export default function GlobalNavigationBar({
  drawerRevealed,
  setDrawerRevealed,
}: IDrawerStatusProps) {
  const auth = useAuth();
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<INotification>>([]);

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
            src={logo}
            width={40}
            height={40}
            alt="로고"
            className="gnb__logo"
          />
        </Link>
        <Link to="/" className="gnb__button gnb__title">
          코더랜드
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
              <h2 className="dropdown-content__title">
                새 소식{" "}
                {notifications.filter((x) => x.isNewNotification).length}개
              </h2>
              <div className="dropdown-content__push">
                <span>푸시 알림</span>
                <SubscribeButton />
              </div>
              <ul className="dropdown-content__container notification-list">
                {notifications.length === 0 ? (
                  <article className="notification--empty">
                    소식이 없습니다.
                  </article>
                ) : (
                  notifications.map((item) => (
                    <article
                      className={formatClassName(
                        "notification",
                        item.isNewNotification && "notification--new"
                      )}
                    >
                      <Link to={item.to}>
                        <span className="highlight">{item.title}</span>에 새
                        댓글이 등록되었습니다.
                      </Link>
                    </article>
                  ))
                )}
              </ul>
            </>
          }
          onClick={async () => {
            const { token } = window;

            if (!token) {
              return;
            }

            const response = await useApi(getNotification());

            if (!response) {
              return;
            }

            setNotifications(response.notification);
          }}
        />
        {auth?.user ? (
          <Dropdown
            ButtonChildren={
              <img
                className="gnb__profile"
                src={auth.user.profile}
                alt="유저 프로필"
              />
            }
            ContentChildren={
              <>
                <figure className="dropdown-profile">
                  <img src={auth.user.profile} alt="유저 프로필" />
                  <figcaption>{auth.user.nickname}</figcaption>
                </figure>
                <nav className="dropdown-nav">
                  <Link to="/user" className="dropdown-nav__item">
                    <i className="icon-settings" />
                    정보 수정
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("token");
                      document.cookie = "";
                      window.location.reload();
                    }}
                    className="dropdown-nav__item"
                  >
                    <i className="icon-lock_open" />
                    로그아웃
                  </button>
                </nav>
              </>
            }
          />
        ) : (
          <Link className="gnb__sign-in" to="/login">
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
}
