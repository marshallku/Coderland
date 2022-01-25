import favicon from "../../static/icon/favicon.svg";

export default function GlobalNavigationBar() {
  return (
    <nav className="gnb">
      <div className="gnb__grow">
        <img src={favicon} height="56" />
      </div>
      <div className="gnb__center"></div>
      <div className="gnb__grow"></div>
    </nav>
  );
}
