import { useState } from "react";
import Drawer from "./Drawer";
import GlobalNavigationBar from "./GNB";

export default function GlobalNavigation() {
  const [drawerRevealed, setDrawerRevealed] = useState(false);

  return (
    <>
      <GlobalNavigationBar
        drawerRevealed={drawerRevealed}
        setDrawerRevealed={setDrawerRevealed}
      />
      <Drawer
        drawerRevealed={drawerRevealed}
        setDrawerRevealed={setDrawerRevealed}
      />
    </>
  );
}
