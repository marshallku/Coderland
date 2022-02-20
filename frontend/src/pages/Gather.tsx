import { useLocation } from "react-router-dom";
import AddPostButton from "../components/AddPostButton";
import Navigation from "../components/Navigation";
import PostList from "../components/PostList";

export default function Gather() {
  const location = useLocation();

  const getLocation = () => {
    const lastPath = location.pathname.split("/").pop();
    const allowedPath = ["gather", "study", "code", "team"];

    if (!lastPath) {
      return "gather";
    }

    if (allowedPath.includes(lastPath)) {
      return lastPath as TSubject;
    }

    return "gather";
  };

  const subject = getLocation();

  return (
    <>
      <h1 className="main-title main-title--post-list">팀원 모집</h1>
      <Navigation
        list={[
          { title: "전체", to: "/gather" },
          { title: "스터디", to: "/gather/study" },
          { title: "모각코", to: "/gather/code" },
          { title: "프로젝트", to: "/gather/team" },
        ]}
        align="center"
      />
      <PostList key={subject} subject={subject} />
      <div>
        <AddPostButton to="gather" />
      </div>
    </>
  );
}
