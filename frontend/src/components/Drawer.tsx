import { useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import formatClassName from "../utils/formatClassName";
import { getRandomInt } from "../utils/random";
import "./Drawer.css";

function randomCssProperty(): React.CSSProperties {
  return {
    "--random-width": `calc(100% - ${getRandomInt(10, 100)}px)`,
  } as React.CSSProperties;
}

function DrawerLink({ title, to, icon, cb }: IDrawerItem) {
  const [cssProperty, setCssProperty] = useState<React.CSSProperties>(
    randomCssProperty()
  );
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: to === "/" });

  return (
    <Link
      to={to}
      className={formatClassName(
        "drawer__link",
        match && "drawer__link--highlight"
      )}
      style={cssProperty}
      onClick={() => {
        if (!match) {
          setCssProperty(randomCssProperty);
        }
        cb?.();
      }}
    >
      <i className={`icon-${icon}`} />
      {title}
    </Link>
  );
}

export default function Drawer({
  drawerRevealed,
  setDrawerRevealed,
}: IDrawerStatusProps) {
  const hideDrawer = () => {
    setDrawerRevealed(false);
  };

  return (
    <>
      <section
        className={formatClassName(
          "drawer",
          drawerRevealed && "drawer-revealed"
        )}
      >
        <h2 className="drawer__title">코더랜드</h2>
        <nav className="drawer__navigation">
          <DrawerLink cb={hideDrawer} icon="home" title="홈" to="/" />
          <DrawerLink
            cb={hideDrawer}
            icon="thumbs_up_down"
            title="후기 / 회고"
            to="/review"
          />
          <DrawerLink
            cb={hideDrawer}
            icon="person_add_alt_1"
            title="팀원 모집"
            to="/gather"
          />
          <DrawerLink
            cb={hideDrawer}
            icon="create"
            title="댓글 남겨줘"
            to="/article"
          />
          <DrawerLink cb={hideDrawer} icon="code" title="개발 정보" to="/dev" />
          <DrawerLink
            cb={hideDrawer}
            icon="home_repair_service"
            title="채용 정보"
            to="/recruit"
          />
          <DrawerLink cb={hideDrawer} icon="chat" title="잡담" to="/chat" />
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
