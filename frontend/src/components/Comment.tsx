import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import toast from "../utils/toast";
import CommentLikeBtn from "./CommentLikeBtn";
import Reply from "./CommentReply";
import { formatToReadableTime } from "../utils/time";
import "./Comment.css";
import {
  createReply,
  deleteComment,
  getCommentList,
  updateComment,
} from "../api";

const REPLY_LIMIT = 3;

export default function Comment({
  postId,
  comment: { _id, contents, author, isPostAuthor, createdAt, likes, replies },
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
  const auth = useAuth();
  const navigate = useNavigate();

  const updateCommentList = async () => {
    const response = await getCommentList({ postId });

    if (response.isOk === false) {
      toast("댓글을 불러오는 데 실패했습니다");
      return;
    }

    setCommentList(response.comments);
  };

  useEffect(() => {
    setStartIdx(Math.max(replies.length - REPLY_LIMIT, 0));
  }, [replies]);

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

    const editCommentResponse = await updateComment({
      contents: editedText,
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

    const deleteCommentResponse = await deleteComment({
      commentId: _id,
      postId,
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
      navigate("/login");
      return;
    }

    if (!replyText) {
      toast("댓글을 입력해주세요!");
      return;
    }

    const newCommentResponse = await createReply({
      contents: replyText,
      commentId: _id,
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
    setFocused(_id);
    setMode(mode === "edit" ? "read" : "edit");
  };

  const handleReplyClick = () => {
    setFocused(_id);
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
            onClick={handleEditClick}
          >
            <i className="icon-create" />
            수정
          </button>
          <button
            className="comment__delete-button"
            type="button"
            aria-label="댓글 삭제 버튼"
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
              <CommentLikeBtn
                likesCount={likesCount}
                setLikesCount={setLikesCount}
                isLiked={isLiked}
                setIsLiked={setIsLiked}
              />
              <button
                className="comment__reply-button"
                type="button"
                onClick={handleReplyClick}
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
              postId={postId}
              parentId={_id}
              reply={reply}
              focused={focused}
              setFocused={setFocused}
              updateCommentList={updateCommentList}
            />
          ))}
    </>
  );
}
