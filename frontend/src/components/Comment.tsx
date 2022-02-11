import { useEffect, useState } from "react";
import CommentLikeBtn from "./CommentLikeBtn";
import Reply from "./CommentReply";
import { formatToReadableTime } from "../utils/time";
import "./Comment.css";

const REPLY_LIMIT = 3;

export default function Comment({
  comment: { _id, contents, author, isPostAuthor, createdAt, likes, replies },
  commentList,
  setCommentList,
  focused,
  setFocused,
}: ICommentProps) {
  const [mode, setMode] = useState<TCommentMode>("read");
  const [editedText, setEditedText] = useState(contents);
  const [replyText, setReplyText] = useState("");
  const [startIdx, setStartIdx] = useState(0);
  const [likesCount, setLikesCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setStartIdx(Math.max(replies.length - REPLY_LIMIT, 0));
  }, [replies]);

  const handleEditSubmit = (event: React.FormEvent, id: string) => {
    event.preventDefault();
    if (editedText) {
      // TODO: PUT Comment
      setCommentList(
        commentList.map((comment) =>
          comment._id === id ? { ...comment, contents: editedText } : comment
        )
      );
      setMode("read");
    }
  };

  const handleDeleteClick = (id: string) => {
    setCommentList(commentList.filter((comment) => comment._id !== id));
  };

  const handleReplySubmit = (event: React.FormEvent, id: string) => {
    event.preventDefault();
    if (replyText) {
      // TODO: POST Reply
      const newReply: ICommentReply = {
        _id: String(Date.now()),
        contents: replyText,
        author: "익명의 도도새",
        isPostAuthor: false,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
      };

      setCommentList(
        commentList.map((comment) =>
          comment._id === id
            ? { ...comment, replies: [...replies, newReply] }
            : comment
        )
      );
      setReplyText("");
      setMode("read");
    }
  };

  const handleEditClick = (id: string) => {
    setFocused(id);
    setMode(mode === "edit" ? "read" : "edit");
  };

  const handleReplyClick = (id: string) => {
    setFocused(id);
    setMode(mode === "reply" ? "read" : "reply");
  };

  return (
    <>
      <div className="comment">
        <div className="comment__author-wrap">
          <span className="comment__author">{author}</span>
          {isPostAuthor && <span className="comment__post-author">작성자</span>}

          <button
            className="comment__edit-button"
            type="button"
            aria-label="댓글 수정 버튼"
            onClick={() => handleEditClick(_id)}
          >
            <i className="icon-create" />
            수정
          </button>
          <button
            className="comment__delete-button"
            type="button"
            aria-label="댓글 삭제 버튼"
            onClick={() => handleDeleteClick(_id)}
          >
            <i className="icon-clear" />
            삭제
          </button>
        </div>

        {mode === "edit" && focused === _id ? (
          <form
            onSubmit={(event) => handleEditSubmit(event, _id)}
            className="comment-form comment-form--edit"
          >
            <input
              value={editedText}
              onChange={(event) => setEditedText(event.target.value)}
              type="text"
              className="comment-form__input"
            />
            <div className="comment-form__button-wrap">
              <button type="submit" className="comment-form__button">
                수정
              </button>
              <button
                type="button"
                onClick={() => setMode("read")}
                className="comment-form__button comment-form__button--cancel"
              >
                취소
              </button>
            </div>
          </form>
        ) : (
          <>
            <p className="comment__text">{contents}</p>
            <div className="comment__info">
              <span className="comment__date">
                {formatToReadableTime(createdAt)}
              </span>
              <CommentLikeBtn
                likesCount={likesCount}
                setLikesCount={setLikesCount}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
              />
              <button
                className="comment__reply-button"
                type="button"
                onClick={() => handleReplyClick(_id)}
              >
                <i className="icon-chat" />
                답글
              </button>
            </div>
          </>
        )}
      </div>

      {mode === "reply" && focused === _id && (
        <form
          onSubmit={(event) => handleReplySubmit(event, _id)}
          className="comment-form comment-form--reply"
        >
          <input
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            type="text"
            className="comment-form__input"
            placeholder="답글을 입력하세요."
          />
          <div className="comment-form__button-wrap">
            <button type="submit" className="comment-form__button">
              등록
            </button>
            <button
              type="button"
              onClick={() => setMode("read")}
              className="comment-form__button comment-form__button--cancel"
            >
              취소
            </button>
          </div>
        </form>
      )}

      {startIdx > 0 && (
        <button
          type="button"
          className="comment__view-more comment__view-more--reply"
          onClick={() => setStartIdx(0)}
        >
          답글 {startIdx}개 더 보기
        </button>
      )}

      {replies.length > 0 &&
        replies
          .slice(startIdx, replies.length)
          .map((reply) => (
            <Reply
              key={reply._id}
              reply={reply}
              focused={focused}
              setFocused={setFocused}
            />
          ))}
    </>
  );
}
