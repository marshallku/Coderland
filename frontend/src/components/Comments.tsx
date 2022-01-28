import { useEffect, useState } from "react";
import { dummyComments } from "../api/dummy";
import useApi from "../api/useApi";
import Comment from "./Comment";
import "./Comments.css";

export default function Comments() {
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState<IComment[]>([]);

  // TODO: GET Comments
  const comments = useApi(dummyComments);
  useEffect(() => {
    setCommentList(comments || []);
  }, [commentList]);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (commentText) {
      // sample comment
      const newComment: IComment = {
        _id: String(Date.now()),
        contents: commentText,
        author: "익명의 도도새",
        postId: "",
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
        likes: 0,
      };
      setCommentList([...commentList, newComment]);
      setCommentText("");
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

      {commentList.map(
        ({
          _id,
          contents,
          author,
          postId,
          createdAt,
          updatedAt,
          likes,
        }: IComment) => (
          <Comment
            key={_id}
            _id={_id}
            contents={contents}
            author={author}
            postId={postId}
            createdAt={createdAt}
            updatedAt={updatedAt}
            likes={likes}
          />
        )
      )}
    </div>
  );
}
