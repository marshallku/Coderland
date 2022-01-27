import { useEffect, useState } from "react";
import { dummyComments } from "../api/dummy";
import useApi from "../api/useApi";
import CommentLikeBtn from "./CommentLikeBtn";
import "./Comments.css";

export default function Comments() {
  const [commentText, setCommentText] = useState<string>("");
  const [commentList, setCommentList] = useState<IComment[]>([]);

  const comments = useApi(dummyComments);

  useEffect(() => {
    setCommentList(comments || []);
  }, [commentList]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (commentText) {
      const newComment: IComment = {
        _id: String(Date.now()),
        contents: commentText,
        author: "익명의 도도새",
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
        likes: 0,
      };
      setCommentList([...commentList, newComment]);
      setCommentText("");
    }
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

        {commentList.map(({ _id, contents, author, createdAt, likes }) => (
          <div className="comment" key={_id}>
            <div className="comment__author-wrap">
              <span className="comment__author">{author}</span>
              <button
                className="comment__edit-button"
                aria-label="댓글 수정 버튼"
              >
                <i className="icon-create" />
              </button>
              <button
                className="comment__delete-button"
                aria-label="댓글 삭제 버튼"
              >
                <i className="icon-clear" />
              </button>
            </div>
            <p className="comment__text">{contents}</p>
            <div className="comment__info">
              <span className="comment__date">
                {/* TODO: time format 유틸리티 함수 사용 */}
                {createdAt.substring(0, 10)}
              </span>
              <CommentLikeBtn likes={likes} />
              <button className="comment__reply">
                <i className="icon-chat" />
                답글
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
