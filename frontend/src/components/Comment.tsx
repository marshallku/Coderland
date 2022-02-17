import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import toast from "../utils/toast";
import { formatToReadableTime } from "../utils/time";
import formatClassName from "../utils/formatClassName";
import Clap from "./Clap";
import useApi from "../hooks/api";
import { useModal } from "../hooks/modal";
import "./Comment.css";
import {
  createReply,
  deleteComment,
  updateComment,
  deleteReply,
  updateReply,
  addCommentClap,
  removeCommentClap,
  createGatherRequest,
  deleteGatherRequest,
} from "../api";

export default function Comment({
  updatePost,
  members,
  isAuthor,
  postId,
  parentId,
  data,
  updateCommentList,
  focusedId,
  setFocusedId,
}: ICommentProps) {
  const [mode, setMode] = useState<TCommentMode>("read");
  const [editedText, setEditedText] = useState(data.contents);
  const [replyText, setReplyText] = useState("");
  const [clapped, setClapped] = useState(!!data.isLiked);
  const [numClap, setNumClap] = useState(data.likes || 0);

  const auth = useAuth();
  const navigate = useNavigate();
  const modal = useModal();

  const isMember =
    members && members.find((member) => member._id === data.author._id);
  const isCommentAuthor = auth?.user?._id === data.author._id;

  const handleEditSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = auth?.user?.token;

    if (!token) {
      modal?.openModal("로그인이 필요한 기능입니다. 로그인하시겠습니까?", () =>
        navigate("/login")
      );
      return;
    }

    if (!editedText) {
      toast("댓글을 입력해주세요!");
      return;
    }

    const editCommentResponse = !parentId
      ? await updateComment({
          contents: editedText,
          commentId: data._id,
          postId,
          token,
        })
      : await updateReply({
          contents: editedText,
          parentId,
          commentId: data._id,
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
      modal?.openModal("로그인이 필요한 기능입니다. 로그인하시겠습니까?", () =>
        navigate("/login")
      );
      return;
    }

    const deleteCommentResponse = !parentId
      ? await deleteComment({
          commentId: data._id,
          postId,
          token,
        })
      : await deleteReply({
          postId,
          parentId,
          commentId: data._id,
          token,
        });

    if (deleteCommentResponse.isOk === false) {
      toast("댓글을 삭제하는 데 실패했습니다");
      return;
    }

    updateCommentList();
  };

  const handleReplySubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = auth?.user?.token;

    if (!token) {
      modal?.openModal("로그인이 필요한 기능입니다. 로그인하시겠습니까?", () =>
        navigate("/login")
      );
      return;
    }

    if (!replyText) {
      toast("댓글을 입력해주세요!");
      return;
    }

    const newCommentResponse = await createReply({
      contents: replyText,
      commentId: data._id,
      postId,
      token,
    });

    if (newCommentResponse.isOk === false) {
      toast("댓글을 작성하는 데 실패했습니다");
      return;
    }

    updateCommentList();
    setReplyText("");
    setMode("read");
  };

  const handleEditClick = () => {
    setFocusedId(data._id);
    setMode(mode === "edit" ? "read" : "edit");
  };

  const handleReplyClick = () => {
    setFocusedId(data._id);
    setMode(mode === "reply" ? "read" : "reply");
  };

  const handleLikeClick = async () => {
    const token = auth?.user?.token;

    if (!token) {
      modal?.openModal("로그인이 필요한 기능입니다. 로그인하시겠습니까?", () =>
        navigate("/login")
      );
      return;
    }

    if (clapped) {
      removeCommentClap({ postId, commentId: data._id, token });
      setNumClap((prev) => prev - 1);
    } else {
      addCommentClap({ postId, commentId: data._id, token });
      setNumClap((prev) => prev + 1);
    }

    setClapped((prev) => !prev);
  };

  const handleGatherRequest = async () => {
    const token = auth?.user?.token;
    const userId = data.author._id;

    if (!token) {
      modal?.openModal("로그인이 필요한 기능입니다. 로그인하시겠습니까?", () =>
        navigate("/login")
      );
      return;
    }

    if (!userId) {
      toast("모임요청을 실패했습니다.");
      return;
    }

    await useApi(
      isMember
        ? deleteGatherRequest({
            postId,
            userId,
            token,
          })
        : createGatherRequest({
            postId,
            userId,
            token,
          })
    );
    updatePost();
  };

  return (
    <>
      <div
        className={formatClassName("comment", parentId && "comment--reply")}
        id={`comment-${data._id}`}
      >
        <div className="comment__author-wrap">
          <span className="comment__author">{data.author.nickname}</span>
          {data.isPostAuthor && (
            <span className="comment__post-author">작성자</span>
          )}

          {isCommentAuthor && (
            <>
              <button
                className="comment__edit-button"
                type="button"
                onClick={handleEditClick}
              >
                <i className="icon-create" />
                수정
              </button>
              <button
                className="comment__delete-button"
                type="button"
                onClick={() =>
                  modal?.openModal("댓글을 삭제하시겠습니까?", () =>
                    handleDeleteClick()
                  )
                }
              >
                <i className="icon-clear" />
                삭제
              </button>
            </>
          )}
        </div>

        {mode === "edit" && focusedId === data._id ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              modal?.openModal("댓글을 수정하시겠습니까?", () =>
                handleEditSubmit(event)
              );
            }}
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
            <p
              className={formatClassName(
                "comment__text",
                data.isDeleted && "comment__text--deleted"
              )}
            >
              {data.isDeleted ? "삭제된 댓글입니다." : data.contents}
            </p>
            <div className="comment__info">
              <span className="comment__date">
                {formatToReadableTime(data.createdAt)}
              </span>
              {!parentId && (
                <>
                  <button
                    type="button"
                    className="comment__like-button"
                    onClick={handleLikeClick}
                  >
                    <Clap activated={clapped} />
                    {!numClap ? "좋아요" : numClap}
                  </button>
                  <button
                    className="comment__reply-button"
                    type="button"
                    onClick={handleReplyClick}
                  >
                    <i className="icon-chat" />
                    답글
                  </button>
                </>
              )}
              {isAuthor &&
                !data.isPostAuthor &&
                members &&
                data.contents.includes("신청") && (
                  <button onClick={handleGatherRequest} type="button">
                    {isMember ? "내보내기" : "수락"}
                  </button>
                )}
            </div>
          </>
        )}
      </div>

      {mode === "reply" && focusedId === data._id && (
        <form
          onSubmit={handleReplySubmit}
          className="comment-form comment-form--reply"
        >
          <input
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            type="text"
            className="comment-form__input"
            placeholder="답글을 남겨주세요."
            onClick={() =>
              !auth?.user?.token &&
              modal?.openModal(
                "로그인이 필요한 기능입니다. 로그인하시겠습니까?",
                () => navigate("/login")
              )
            }
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
    </>
  );
}
