import { useState } from "react";
import CommentLikeBtn from "./CommentLikeBtn";
import Reply from "./CommentReply";
import { formatToReadableTime } from "../utils/time";
import "./Comment.css";

export default function Comment({
  contents,
  author,
  createdAt,
  likes,
  replies,
}: IComment) {
  const [editMode, setEditMode] = useState(false);
  const [replyMode, setReplyMode] = useState(false);
  const [editedText, setEditedText] = useState(contents);
  const [replyText, setReplyText] = useState("");

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setEditedText(contents);
  };

  const toggleReplyMode = () => {
    setReplyMode((prev) => !prev);
    setReplyText("");
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedText) {
      // TODO: PUT Comment
      // const editedComment = {
      //   contents: editedText,
      //   updatedAt: new Date(Date.now()).toISOString(),
      // };
      toggleEditMode();
    }
  };

  const handleReplySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (replyText) {
      // TODO: POST Reply
      // const reply: ICommentReply = {
      //   _id: String(Date.now()),
      //   contents: replyText,
      //   author: "익명의 도도새",
      //   isPostAuthor: false,
      //   createdAt: new Date(Date.now()).toISOString(),
      //   updatedAt: new Date(Date.now()).toISOString(),
      // };
      toggleReplyMode();
    }
  };

  return (
    <div className="comment-wrap">
      <div className="comment">
        <div className="comment__author-wrap">
          <span className="comment__author">{author}</span>
          <button
            className={`comment__edit-button ${
              editMode ? "comment__edit--on" : ""
            }`}
            type="button"
            aria-label="댓글 수정 버튼"
            onClick={toggleEditMode}
          >
            <i className="icon-create" />
            수정
          </button>
          <button
            className="comment__delete-button"
            type="button"
            aria-label="댓글 삭제 버튼"
          >
            <i className="icon-clear" />
            삭제
          </button>
        </div>

        {editMode ? (
          <form
            onSubmit={handleEditSubmit}
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
                onClick={toggleEditMode}
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
              <CommentLikeBtn likes={likes} />
              <button
                className={`comment__reply ${
                  replyMode ? "comment__reply--on" : ""
                }`}
                type="button"
                onClick={toggleReplyMode}
              >
                <i className="icon-chat" />
                답글
              </button>
            </div>
          </>
        )}
      </div>

      {replyMode ? (
        <form
          onSubmit={handleReplySubmit}
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
              onClick={toggleReplyMode}
              className="comment-form__button comment-form__button--cancel"
            >
              취소
            </button>
          </div>
        </form>
      ) : (
        ""
      )}

      {replies.length > 0
        ? replies.map(
            ({
              _id: replyId,
              contents: replyContents,
              author: replyAuthor,
              isPostAuthor,
              createdAt: replyCreatedAt,
              updatedAt: replyUpdatedAt,
            }: ICommentReply) => (
              <Reply
                key={replyId}
                _id={replyId}
                contents={replyContents}
                author={replyAuthor}
                isPostAuthor={isPostAuthor}
                createdAt={replyCreatedAt}
                updatedAt={replyUpdatedAt}
              />
            )
          )
        : ""}
    </div>
  );
}
