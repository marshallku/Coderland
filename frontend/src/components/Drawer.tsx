import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { getRandomInt } from "../utils/random";
import "./Drawer.css";

function randomCssProperty(): React.CSSProperties {
  return {
    "--random-width": `calc(100% - ${getRandomInt(10, 100)}px)`,
  } as React.CSSProperties;
}

function DrawerLink({ title, to, cb }: DrawerItem) {
  const [cssProperty, setCssProperty] = useState<React.CSSProperties>(
    randomCssProperty()
  );
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      to={to}
      className={`drawer__link${match ? " drawer__link--highlight" : ""}`}
      style={cssProperty}
      onClick={() => {
        if (!match) {
          setCssProperty(randomCssProperty);
        }
        cb?.();
      }}
    >
      {title}
    </Link>
  );
}

export default function Drawer({
  drawerRevealed,
  setDrawerRevealed,
}: DrawerStatusProps) {
  const hideDrawer = () => {
    setDrawerRevealed(false);
  };

  return (
    <>
      <section className={`drawer${drawerRevealed ? " drawer--revealed" : ""}`}>
        <h2 className="drawer__title">코더랜드</h2>
        <nav className="drawer__navigation">
          <DrawerLink cb={hideDrawer} title="홈" to="/" />
          <DrawerLink cb={hideDrawer} title="후기 / 회고" to="/review" />
          <DrawerLink cb={hideDrawer} title="팀원 모집" to="/gather" />
          <DrawerLink cb={hideDrawer} title="댓글 남겨줘" to="/article" />
          <DrawerLink cb={hideDrawer} title="개발 정보" to="/dev" />
          <DrawerLink cb={hideDrawer} title="채용 정보" to="/recruit" />
          <DrawerLink cb={hideDrawer} title="잡담" to="/chat" />
        </nav>
      </section>
      <button
        className={`drawer-closer${
          drawerRevealed ? " drawer-closer--revealed" : ""
        }`}
        onClick={hideDrawer}
        type="button"
        aria-label="드로어 닫기"
      />
    </>
  );
}
