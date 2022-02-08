import AddPostButton from "../components/AddPostButton";
import PostList from "../components/PostList";

export default function Review() {
  return (
    <>
      <PostList subject="review" />
      <AddPostButton to="review" />
    </>
  );
}
