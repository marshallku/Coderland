import AddPostButton from "../components/AddPostButton";
import PostList from "../components/PostList";

export default function Article() {
  return (
    <>
      <PostList subject="article" />
      <AddPostButton to="article" />
    </>
  );
}
