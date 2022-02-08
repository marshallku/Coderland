import useApi from "../hooks/api";
import { dummyPostsResponse } from "../api/dummy";
import Loader from "../components/Loader";
import PostList from "../components/PostList";
import "./Home.css";

export default function Home() {
  const response = useApi(dummyPostsResponse);
  if (!response) return <Loader />;
  return (
    <>
      <div className="home__banner">배너 들어갈 공간</div>
      <div className="home__grid">
        <PostList subject="topView" />
        <PostList subject="latest" />
        <PostList subject="article" />
        <PostList subject="dev" />
        <PostList subject="recruit" />
        <PostList subject="chat" />
        <PostList subject="review" />
        <PostList subject="gather" />
      </div>
    </>
  );
}
