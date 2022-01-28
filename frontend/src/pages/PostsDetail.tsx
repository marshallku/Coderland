import { useState } from "react";
import { dummyPostResponse } from "../api/dummy";
import { formatToReadableTime } from "../utils/time";
import useApi from "../api/useApi";
import MarkdownViewer from "../components/MarkdownViewer";
import Comments from "../components/Comments";
import "./PostsDetail.css";

export default function Detail() {
  const [likesStatus, setLikesStatus] = useState(false);
  const [bookmarkStatus, setBookmarkStatus] = useState(false);

  const selected = useApi(dummyPostResponse);

  // response.find((post) => post._id === params.id);

  // useEffect(() => {}, [likesStatus, bookmarkStatus]);

  function handleBookmarkClick() {
    setBookmarkStatus(!bookmarkStatus);
  }

  function handleLikesClick() {
    setLikesStatus(!likesStatus);
    // TODO: put?patch? 통신하여 likesStatus에 따라 증가/감소값 넘겨주기 (id건네주어서 해당 db값 변경)
    // 참고: async function postTopic(evt) {
    //   const response = await fetch('http://localhost:3000/topics/', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    // body: JSON.stringify({ _id: , likes: selected +-1 })
    //   });
    //   const result = await response.json();
    //   return result;
    // }
  }

  return (
    <div className="detail">
      <div className="header">
        <h2 className="header__title">{selected?.post.title}</h2>
        <div className="header-container">
          <div className="header-container-left">
            <div className="header-container__subject">
              {selected?.post.subject}
            </div>
            <div className="header-container__author">
              {selected?.post.author}
            </div>
            <div className="header-container__created">
              {formatToReadableTime(selected?.post.createdAt || "")}
            </div>
          </div>
          <div className="header-container-right">
            <div
              role="button"
              aria-label="북마크 버튼"
              className={
                bookmarkStatus
                  ? "icon-bookmark header-container__bookmark--true"
                  : "icon-bookmark_outline"
              }
              onClick={handleBookmarkClick}
            ></div>
            <div
              role="button"
              aria-label="좋아요 버튼"
              className={`icon-thumb_up${
                likesStatus ? " header-container__likes--true" : ""
              }`}
              onClick={handleLikesClick}
            >
              {selected?.post.likes}
            </div>
            <div className="header-container__views icon-visibility">
              {selected?.post.view}
            </div>
          </div>
        </div>
      </div>
      <MarkdownViewer
        value={selected?.post.contents || ""}
        className="content"
      ></MarkdownViewer>
      <Comments></Comments>
    </div>
  );
}
