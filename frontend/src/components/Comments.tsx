import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { createComment, getCommentList } from "../api";
import { scrollTo } from "../animation/scroll";
import Comment from "./Comment";
import toast from "../utils/toast";
import "./Comments.css";

const COMMENT_LIMIT = 10;

export default function Comments({ postId }: ICommentsProps) {
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [startIdx, setStartIdx] = useState(0);
  const [focused, setFocused] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const response = await getCommentList({ postId });

      if (response.isOk === false) {
        toast("댓글을 불러오는 데 실패했습니다");
        return;
      }

      setCommentList(response.comments);
    };
    init();
  }, []);

  useEffect(() => {
    setStartIdx(Math.max(commentList.length - COMMENT_LIMIT, 0));
  }, [commentList]);

  const handleCommentSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = auth?.user?.token;

    if (!token) {
      navigate("/login");
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

    const response = await getCommentList({ postId });

    if (response.isOk === false) {
      toast("댓글을 불러오는 데 실패했습니다");
      return;
    }

    setCommentList(response.comments);
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
        <>
          <Comment
            postId={postId}
            key={comment._id}
            parentId=""
            data={comment}
            setCommentList={setCommentList}
            focused={focused}
            setFocused={setFocused}
          />

          {/* TODO: 답글 더보기 버튼 추가 */}
          {comment.replies.map((reply) => (
            <Comment
              postId={postId}
              key={reply._id}
              parentId={comment._id}
              data={reply}
              setCommentList={setCommentList}
              focused={focused}
              setFocused={setFocused}
            />
          ))}
        </>
      ))}
    </div>
  );
}
