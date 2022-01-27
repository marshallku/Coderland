import { useState, useEffect } from "react";
import { dummyAnonymousPost } from "../api/dummy";
import useApi from "../api/useApi";
import MarkdownViewer from "../components/MarkdownViewer";
import Comments from "../components/Comments";
import "./Detail.css";

export default function Detail() {
  const [likesStatus, setLikesStatus] = useState(false);
  // const params = useParams();

  const selectedPost = useApi(dummyAnonymousPost);
  // response.find((post) => post._id === params.id);

  useEffect(() => {}, [likesStatus]);

  function handleClick() {
    setLikesStatus(!likesStatus);
    // TODO: put?patch? 통신하여 likesStatus에 따라 증가/감소값 넘겨주기 (id건네주어서 해당 db값 변경)
    // 참고 : async function postTopic(evt) {
    //   const response = await fetch('http://localhost:3000/topics/', {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    // body: JSON.stringify({ _id: , likes: selectedPost +-1 })
    //   });
    //   const result = await response.json();
    //   return result;
    // }
  }

  return (
    <div className="detail">
      <div className="header">
        <h2 className="header__title">{selectedPost?.title}</h2>
        <div className="header-container">
          <div className="header-container__author">
            {selectedPost?.author === "anonymity"
              ? "익명"
              : selectedPost?.author}
          </div>
          <div className="header-container__created">
            {selectedPost?.createdAt.split("T")[0]}
          </div>
          <div
            className={`icon-check${
              likesStatus ? " header-container__likes--true" : ""
            }`}
            onClick={handleClick}
          >
            {selectedPost?.likes}
          </div>
          <div className="header-container__views icon-check">
            {selectedPost?.view}
          </div>
        </div>
      </div>
      <MarkdownViewer
        value={selectedPost?.contents || ""}
        className="content"
      ></MarkdownViewer>
      <Comments></Comments>
    </div>
  );
}
