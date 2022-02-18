import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { createComment, getCommentList } from "../api";
import { scrollTo } from "../animation/scroll";
import Comment from "./Comment";
import toast from "../utils/toast";
import DisplayError from "./DisplayError";
import { useModal } from "../hooks/modal";
import "./Comments.css";

const COMMENT_LIMIT = 10;
const REPLY_LIMIT = 3;

export default function Comments({
  updatePost,
  isAuthor,
  members,
  postId,
}: ICommentsProps) {
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState<Array<IComment>>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedIndexes, setExpandedIndexes] = useState<Array<number>>([]);
  const [focusedId, setFocusedId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const modal = useModal();

  const updateCommentList = async () => {
    const token = auth?.user?.token;

    const response = token
      ? await getCommentList({ postId, token })
      : await getCommentList({ postId });

    if (response.isOk === false) {
      toast("댓글을 불러오는 데 실패했습니다");
      return;
    }

    setCommentList(response.comments);
  };

  useEffect(() => {
    const init = async () => {
      await updateCommentList();
      setIsLoaded(true);
    };

    init();
  }, []);

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = auth?.user?.token;

    if (!token) {
      modal?.openModal("로그인이 필요한 기능입니다. 로그인하시겠습니까?", () =>
        navigate("/login")
      );
      return;
    }

    if (!commentText) {
      toast("댓글을 입력해주세요!");
      return;
    }

    const newCommentResponse = await createComment({
      contents: commentText,
      postId,
      token,
    });

    if (newCommentResponse.isOk === false) {
      toast("댓글을 작성하는 데 실패했습니다");
      return;
    }

    await updateCommentList();
    setCommentText("");
    scrollTo(
      document.getElementById(`comment-${newCommentResponse.commentId}`)
        ?.offsetTop || null
    );
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
            placeholder="댓글을 남겨주세요."
            className="comment-form__input"
            onClick={() =>
              !auth?.user?.token &&
              modal?.openModal(
                "로그인이 필요한 기능입니다. 로그인하시겠습니까?",
                () => navigate("/login")
              )
            }
          />
          <button
            type="submit"
            className="comment-form__button comment-form__button--submit"
          >
            등록
          </button>
        </div>
      </form>

      {isLoaded && !commentList.length && (
        <DisplayError message="아직 댓글이 없어요. 첫 댓글을 남겨보세요." />
      )}

      {commentList.length > COMMENT_LIMIT && !isExpanded && (
        <button
          type="button"
          className="comment__view-more"
          onClick={() => setIsExpanded(true)}
        >
          댓글 {commentList.length - COMMENT_LIMIT}개 더 보기
        </button>
      )}

      {commentList
        .slice(isExpanded ? 0 : -COMMENT_LIMIT)
        .map((comment, index) => (
          <>
            <Comment
              key={comment._id}
              updatePost={updatePost}
              members={members}
              isAuthor={isAuthor}
              postId={postId}
              data={comment}
              updateCommentList={updateCommentList}
              focusedId={focusedId}
              setFocusedId={setFocusedId}
            />

            {comment.replies.length > REPLY_LIMIT &&
              !expandedIndexes.includes(index) && (
                <button
                  type="button"
                  className="comment__view-more comment__view-more--reply"
                  onClick={() => setExpandedIndexes((prev) => [...prev, index])}
                >
                  답글 {comment.replies.length - REPLY_LIMIT}개 더 보기
                </button>
              )}

            {comment.replies
              .slice(expandedIndexes.includes(index) ? 0 : -REPLY_LIMIT)
              .map((reply) => (
                <Comment
                  key={reply._id}
                  updatePost={updatePost}
                  members={members}
                  isAuthor={isAuthor}
                  postId={postId}
                  parentId={comment._id}
                  data={reply}
                  updateCommentList={updateCommentList}
                  focusedId={focusedId}
                  setFocusedId={setFocusedId}
                />
              ))}
          </>
        ))}
    </div>
  );
}
