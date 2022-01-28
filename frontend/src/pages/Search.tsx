import { useState } from "react";
import Navigation from "../components/Navigation";
import "./Search.css";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigationItems = [
    { title: "전체", to: "/search" },
    { title: "후기 / 회고", to: "/search/review" },
    { title: "팀원 모집", to: "/search/gather" },
    { title: "댓글 남겨줘", to: "/search/article" },
    { title: "개발 정보", to: "/search/dev" },
    { title: "채용 정보", to: "/search/recruit" },
    { title: "잡담", to: "/search/chat" },
  ];

  return (
    <>
      <Navigation list={navigationItems} />
      <form
        className="search-box"
        onSubmit={(event) => {
          event.preventDefault();
          // TODO: 검색 요청
        }}
      >
        <i className="icon-search search-box__icon" />
        <input
          className="search-box__input"
          placeholder="검색어를 입력해주세요."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </form>
      <div className="search-list">{/* TODO: 검색 결과 출력 */}</div>
    </>
  );
}
