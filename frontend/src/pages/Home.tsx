import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCarouselData from "../api/home";
import Carousel from "../components/Carousel";
import PostList from "../components/PostList";
import useApi from "../hooks/api";
import formatClassName from "../utils/formatClassName";
import "./Home.css";

function HomePostList({ subject, isLarge }: IHomePostListProps) {
  const subjectsInKr: {
    // eslint-disable-next-line no-unused-vars
    [key in TSubject]: string;
  } = {
    article: "댓글 남겨줘",
    dev: "개발 정보",
    recruit: "취업 정보",
    chat: "잡담",
    review: "후기 / 회고",
    gather: "팀원 모집",
    study: "스터디 모집",
    code: "모각코 모집",
    team: "팀 모집",
  };

  return (
    <section
      className={formatClassName("home-posts", isLarge && "home-posts--large")}
    >
      <header className="home-posts__header">
        <h2 className="home-posts__title">{subjectsInKr[subject]}</h2>
        <Link className="home-posts__link" to={`/${subject}`}>
          더 보기
          <i className="icon-east" />
        </Link>
      </header>
      <PostList subject={subject} limit={3} preventPaginate />
    </section>
  );
}

export default function Home() {
  const [carouselData, setCarouselData] = useState<Array<ICarouselItem>>([
    {
      title: "로딩 중...",
      to: "/",
      // Base64 Encoded Transparent Image
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
    },
  ]);

  useEffect(() => {
    async function getData() {
      const response = await useApi(getCarouselData());

      if (!response) {
        return;
      }

      setCarouselData(response.carousel);
    }

    getData();
  }, []);

  return (
    <div className="home">
      <Carousel data={carouselData} />
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
