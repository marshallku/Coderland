import PostCardItem from "./PostCardItem";
import PostListItem from "./PostListItem";

export default function Posts({ subject, postList }: IPostsProps) {
  return (
    <div className="post-list__wrapper">
      {subject === "gathering" ? (
        <PostCardItem postList={postList as TPostCard} />
      ) : (
        <PostListItem postList={postList as TPostList} />
      )}{" "}
    </div>
  );
}
