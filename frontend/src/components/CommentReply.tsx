import { useState } from "react";
import { formatToReadableTime } from "../utils/time";

export default function Reply({
  reply: { _id, contents, author, isPostAuthor, createdAt },
  focused,
  setFocused,
}: IReplyProps) {
  const [mode, setMode] = useState<TCommentMode>("read");
  const [editedText, setEditedText] = useState(contents);

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedText) {
      // TODO: PUT Reply
      setMode("read");
    }
  };

  const handleEditClick = (id: string) => {
    setFocused(id);
    setMode(mode === "edit" ? "read" : "edit");
  };

  return (
    <div className="comment comment--reply">
      <div className="comment__author-wrap">
        <span className="comment__author">{author}</span>
        {isPostAuthor && <span className="comment__post-author">작성자</span>}

        <button
          type="button"
          className="comment__edit-button"
          aria-label="답글 수정 버튼"
          onClick={() => handleEditClick(_id)}
        >
          <i className="icon-create" />
          수정
        </button>
        <button
          className="comment__delete-button"
          type="button"
          aria-label="답글 삭제 버튼"
        >
          <i className="icon-clear" />
          삭제
        </button>
      </div>

      {mode === "edit" && focused === _id ? (
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
          </div>
        </>
      )}
    </div>
  );
}
