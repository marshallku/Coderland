import { useState } from "react";
import { CommentList } from "../@types/Comments";
import "./Comments.css";

export default function Comments() {
  const [commentText, setCommentText] = useState<string>("");
  const [commentList, setCommentList] = useState<CommentList[]>([]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newComment = {
      id: String(Date.now()),
      text: commentText,
      author: "익명의 도도새",
      createdAt: new Date(Date.now()),
      likes: 0,
      reply: 0,
    };
    setCommentList([...commentList, newComment]);
    setCommentText("");
  };

  return (
    <>
      <div className="comments-wrap">
        <h3>댓글 {commentList.length}개</h3>
        <div className="comment-form-wrap">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              type="text"
              placeholder="댓글을 입력하세요."
              className="comment-form__input"
            />
            <button type="submit" className="comment-form__button">
              등록
            </button>
          </form>
        </div>

        {commentList.map(({ id, text, author, createdAt, likes, reply }) => (
          <div className="comment" key={id} id={id}>
            <p className="comment__author">{author}</p>
            <p className="comment__text">{text}</p>
            <div className="comment__info">
              <span className="comment__date">
                {createdAt.toLocaleDateString("ko-KR")}
              </span>
              <button className="comment__likes">
                좋아요 {likes === 0 ? "" : likes}
              </button>
              <button className="comment__reply">
                대댓글 {reply === 0 ? "" : reply}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
