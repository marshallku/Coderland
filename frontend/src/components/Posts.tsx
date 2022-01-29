import PostCardItem from "./PostCardItem";
import PostListItem from "./PostListItem";

export default function Posts({ postType, postList }: IPostsProps) {
  return (
    <div className="post-list__wrapper">
      {postType === "postList" ? (
        <PostListItem postList={postList as TPostList} />
      ) : (
        <PostCardItem postList={postList as TPostCard} />
      )}{" "}
    </div>
  );
}
