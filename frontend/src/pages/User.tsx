import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function User() {
  return (
    <div>
      <Navigation
        list={[
          { title: "기본정보", to: "info" },
          { title: "포스트", to: "post" },
          { title: "모집글", to: "gather" },
          { title: "댓글", to: "comment" },
          { title: "북마크", to: "bookmark" },
        ]}
        align="center"
      />
      <Outlet />
    </div>
  );
}
