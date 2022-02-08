import { useEffect, useState } from "react";
import { dummyCommentsResponse } from "../api/dummy";
import Comment from "./Comment";
import "./Comments.css";

export default function Comments() {
  const [commentText, setCommentText] = useState("");
  const [commentList, setCommentList] = useState<IComment[]>([]);

  // TODO: GET Comment
  useEffect(() => {
    const getComments = async () => {
      const response = await dummyCommentsResponse;
      setCommentList(response?.comments || []);
    };
    getComments();
  }, []);

  const handleCommentSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (commentText) {
      // TODO: POST Comment
      const newComment: IComment = {
        _id: String(Date.now()),
        contents: commentText,
        author: "익명의 도도새",
        postId: "",
        likes: 0,
        isPostAuthor: false,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
        replies: [],
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
          likes,
          isPostAuthor,
          createdAt,
          updatedAt,
          replies,
        }: IComment) => (
          <Comment
            key={_id}
            _id={_id}
            contents={contents}
            author={author}
            postId={postId}
            likes={likes}
            isPostAuthor={isPostAuthor}
            createdAt={createdAt}
            updatedAt={updatedAt}
            replies={replies}
          />
        )
      )}
    </div>
  );
}
