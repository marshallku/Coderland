import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteReply, updateReply } from "../api";
import { useAuth } from "../hooks/auth";
import { formatToReadableTime } from "../utils/time";
import toast from "../utils/toast";

export default function Reply({
  parentId,
  postId,
  reply: { _id, contents, author, isPostAuthor, createdAt },
  focused,
  setFocused,
  updateCommentList,
}: IReplyProps) {
  const [mode, setMode] = useState<TCommentMode>("read");
  const [editedText, setEditedText] = useState(contents);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = auth?.user?.token;

    if (!token) {
      navigate("/login");
      return;
    }

    if (!editedText) {
      toast("댓글을 입력해주세요!");
      return;
    }

    const editCommentResponse = await updateReply({
      contents: editedText,
      parentId,
      commentId: _id,
      postId,
      token,
    });

    if (editCommentResponse.isOk === false) {
      toast("댓글을 수정하는 데 실패했습니다");
      return;
    }

    updateCommentList();
    setMode("read");
  };

  const handleDeleteClick = async () => {
    const token = auth?.user?.token;

    if (!token) {
      navigate("/login");
      return;
    }

    const deleteCommentResponse = await deleteReply({
      postId,
      parentId,
      commentId: _id,
      token,
    });

    if (deleteCommentResponse.isOk === false) {
      toast("댓글을 삭제하는 데 실패했습니다");
      return;
    }

    updateCommentList();
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
          onClick={handleDeleteClick}
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
