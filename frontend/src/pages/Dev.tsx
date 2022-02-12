import AddPostButton from "../components/AddPostButton";
import PageTitle from "../components/PageTitle";
import PostList from "../components/PostList";

export default function Dev() {
  return (
    <>
      <PageTitle subject="dev" />
      <PostList subject="dev" />
      <AddPostButton to="dev" />
    </>
  );
}
