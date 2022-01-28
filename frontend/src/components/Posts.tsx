import Loader from "./Loader";
import PostListItem from "./PostListItem";

export default function Posts({ postList, isLoading }: IPostsProps) {
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="post-list__wrapper">
      <PostListItem postList={postList} />
    </div>
  );
}
