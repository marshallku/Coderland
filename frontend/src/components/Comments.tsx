import { useEffect, useState } from "react";
import { dummyCommentsResponse } from "../api/dummy";
import { scrollTo } from "../animation/scroll";
import Comment from "./Comment";
import "./Comments.css";

const COMMENT_LIMIT = 10;

export default function Comments() {
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [startIdx, setStartIdx] = useState(0);
  const [focused, setFocused] = useState("");

  // TODO: GET Comment
  useEffect(() => {
    const getComments = async () => {
      const response = await dummyCommentsResponse;
      setCommentList(response?.comments || []);
    };
    getComments();
  }, []);

  useEffect(() => {
    setStartIdx(Math.max(commentList.length - COMMENT_LIMIT, 0));
  }, [commentList]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (commentText) {
      // TODO: POST Comment
      const newComment = {
        _id: String(Date.now()),
        contents: commentText,
        author: "익명의 도도새",
        postId: "",
        likes: 0,
        isPostAuthor: false,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
        replies: [],
      };
      setCommentList([...commentList, newComment]);
      setCommentText("");
      scrollTo(document.body.scrollHeight);
    }
  };

  return (
    <div className="comments-wrap">
      <h3>댓글 {commentList.length}개</h3>
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <div className="comment-form__input-wrap">
          <input
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            type="text"
            placeholder="댓글을 입력하세요."
            className="comment-form__input"
          />
          <button
            type="submit"
            className="comment-form__button comment-form__button--submit"
          >
            등록
          </button>
        </div>
      </form>

      {startIdx > 0 && (
        <button
          type="button"
          className="comment__view-more"
          onClick={() => setStartIdx(0)}
        >
          댓글 {startIdx}개 더 보기
        </button>
      )}

      {commentList.slice(startIdx, commentList.length).map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          commentList={commentList}
          setCommentList={setCommentList}
          focused={focused}
          setFocused={setFocused}
        />
      ))}
    </div>
  );
}
