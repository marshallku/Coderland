import { useState } from "react";
import { formatToReadableTime } from "../utils/time";

export default function Reply({ contents, author, createdAt }: ICommentReply) {
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(contents);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setEditedText(contents);
  };

  const handleEditSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editedText) {
      // TODO: PUT Reply
      // const editedReply = {
      //   contents: editedText,
      //   updatedAt: new Date(Date.now()).toISOString(),
      // };
      toggleEditMode();
    }
  };

  return (
    <div className="comment comment--reply">
      <div className="comment__author-wrap">
        <span className="comment__author">{author}</span>
        <button
          className={`comment__edit-button ${
            editMode ? "comment__edit--on" : ""
          }`}
          type="button"
          aria-label="답글 수정 버튼"
          onClick={toggleEditMode}
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
          </div>
        </>
      )}
    </div>
  );
}
