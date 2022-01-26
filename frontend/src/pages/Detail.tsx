import { useParams, useLocation } from "react-router-dom";
import { postsListInfo } from "../data/dummy";
import MarkdownViewer from "../components/MarkdownViewer";
import "./Detail.css";

export default function Detail() {
  // TODO: posts와 recruit구분하여 값 가져오기?
  // const location = useLocation();
  // console.log(location.pathname);

  const params = useParams();
  const selectedPost = postsListInfo.find(
    (post) => post.id === Number(params.id)
  );

  return (
    <div className="detail">
      <div className="header">
        <h2 className="header__title">{selectedPost && selectedPost.title}</h2>
        <div className="header-subcontainer">
          <div className="header-subcontainer__author">
            {selectedPost && selectedPost.author}
          </div>
          <div className="header-subcontainer__created">2022-01-01</div>
        </div>
      </div>
      <MarkdownViewer value="마크다운" className="content"></MarkdownViewer>
      <div className="comment">댓글 컴포넌트</div>
    </div>
  );
}
