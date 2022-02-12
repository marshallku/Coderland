import AddPostButton from "../components/AddPostButton";
import PageTitle from "../components/PageTitle";
import PostList from "../components/PostList";

export default function Chat() {
  return (
    <>
      <PageTitle subject="chat" />
      <PostList subject="chat" />
      <AddPostButton to="chat" />
    </>
  );
}
