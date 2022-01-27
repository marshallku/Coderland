import { Link } from "react-router-dom";

export default function Posts({ postList, isLoading }: IPostsProps) {
  if (isLoading) {
    return <div>로딩 중입니다.</div>;
  }
  return (
    <>
      {postList?.map(
        ({ _id, title, author, comments, likes, view }: IPostList) => {
          return (
            <Link key={_id} className="post-list__post" to={`/posts/${_id}`}>
              <div className="post__title">{title}</div>
              <div className="post__comments">{comments}</div>
              <div className="post__likes">{likes}</div>
              <div className="post__views">{view}</div>
              <div className="post__author">{author}</div>
            </Link>
          );
        }
      )}
    </>
  );
}
