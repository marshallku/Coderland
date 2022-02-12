import { Link } from "react-router-dom";
import PostList from "../components/PostList";
import formatClassName from "../utils/formatClassName";
import "./Home.css";

function HomePostList({ subject, isLarge }: IHomePostListProps) {
  return (
    <section
      className={formatClassName("home-posts", isLarge && "home-posts--large")}
    >
      <PostList subject={subject} limit={3} preventPaginate />
      <footer className="home-posts__footer">
        <Link to={`/${subject}`}>더 보기</Link>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <div className="home">
      <div className="home__banner">배너 들어갈 공간</div>
      <div className="home__grid">
        <HomePostList subject="gather" isLarge />
        <HomePostList subject="review" />
        <HomePostList subject="dev" />
        <HomePostList subject="recruit" />
        <HomePostList subject="chat" />
        <HomePostList subject="article" />
      </div>
    </div>
  );
}
