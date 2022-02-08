import { Link } from "react-router-dom";
import PostList from "../components/PostList";
import "./Home.css";

function HomePostList({ subject, isLarge }: IHomePostListProps) {
  const subjectsInKr: {
    // eslint-disable-next-line no-unused-vars
    [key in TSubject]: string;
  } = {
    article: "댓글 남겨줘",
    dev: "개발 정보",
    recruit: "채용 정보",
    chat: "잡담",
    review: "후기 / 회고",
    gather: "팀원 모집",
    study: "스터디 모집",
    code: "모각코 모집",
    team: "팀 모집",
  };

  return (
    <section className={`home-posts${isLarge ? " home-posts--large" : ""}`}>
      <header className="home-posts__header">
        <h2 className="home-posts__title">{subjectsInKr[subject]}</h2>
      </header>
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
