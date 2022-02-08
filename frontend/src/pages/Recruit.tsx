import AddPostButton from "../components/AddPostButton";
import PostList from "../components/PostList";

export default function Recruit() {
  return (
    <>
      <PostList subject="recruit" />
      <AddPostButton to="recruit" />
    </>
  );
}
