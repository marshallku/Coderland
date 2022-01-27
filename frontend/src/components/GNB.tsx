import favicon from "../../static/image/favicon.svg";
import "./GNB.css";

export default function GlobalNavigationBar({
  drawerRevealed,
  setDrawerRevealed,
}: DrawerStatusProps) {
  return (
    <nav className="gnb">
      <div className="gnb__grow">
        <button
          className={`hbg gnb__button${
            drawerRevealed ? " hbg--activated" : ""
          }`}
          aria-label="드로어 열기"
          onClick={() => setDrawerRevealed(!drawerRevealed)}
        >
          <div className="hbg__line hbg__line--top"></div>
          <div className="hbg__line hbg__line--mid"></div>
          <div className="hbg__line hbg__line--bot"></div>
        </button>
        <img src={favicon} height="56" />
      </div>
      <div className="gnb__center"></div>
      <div className="gnb__grow"></div>
    </nav>
  );
}
