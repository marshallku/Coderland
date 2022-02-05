import { useApi } from "../api";
import { dummyGathersResponse } from "../api/dummy";
import AddPostButton from "../components/AddPostButton";
import Loader from "../components/Loader";
import Navigation from "../components/Navigation";
import PostList from "../components/PostList";

export default function Gather() {
  const response = useApi(dummyGathersResponse);

  if (!response) return <Loader />;

  return (
    <>
      <Navigation
        list={[
          { title: "전체", to: "/gather" },
          { title: "스터디", to: "/gather/study" },
          { title: "모각코", to: "/gather/code" },
          { title: "프로젝트", to: "/gather/team" },
        ]}
        align="center"
      />
      <PostList subject="gather" />
      <div>
        <AddPostButton to="gather" />
      </div>
    </>
  );
}
