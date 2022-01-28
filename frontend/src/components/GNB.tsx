import { Link } from "react-router-dom";
import favicon from "../../static/image/favicon.svg";
import "./GNB.css";

export default function GlobalNavigationBar({
  drawerRevealed,
  setDrawerRevealed,
}: DrawerStatusProps) {
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
        <Link to="/search" className="gnb__button">
          <i role="img" aria-label="검색" className="icon-search" />
        </Link>
        {/* TODO: Dropdown 메뉴 구현 */}
        <button type="button" className="gnb__button">
          <i role="img" aria-label="알림" className="icon-notifications" />
        </button>
        {/* TODO: 유저 프로필 이미지 추가 */}
        <button
          type="button"
          className={`hbg gnb__button${
            drawerRevealed ? " hbg--activated" : ""
          }`}
          aria-label="드로어 열기"
          onClick={() => setDrawerRevealed(!drawerRevealed)}
        >
          <div className="hbg__line hbg__line--top" />
          <div className="hbg__line hbg__line--mid" />
          <div className="hbg__line hbg__line--bot" />
        </button>
      </div>
    </nav>
  );
}
