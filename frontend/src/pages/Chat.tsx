import AddPostButton from "../components/AddPostButton";
import PostList from "../components/PostList";

export default function Chat() {
  return (
    <>
      <PostList subject="chat" />
      <AddPostButton to="chat" />
    </>
  );
}
