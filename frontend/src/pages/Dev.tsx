import AddPostButton from "../components/AddPostButton";
import PostList from "../components/PostList";

export default function Dev() {
  return (
    <>
      <PostList subject="dev" />
      <AddPostButton to="dev" />
    </>
  );
}
