import AddPostButton from "../components/AddPostButton";
import PageTitle from "../components/PageTitle";
import PostList from "../components/PostList";

export default function Article() {
  return (
    <>
      <PageTitle subject="article" />
      <PostList subject="article" />
      <AddPostButton to="article" />
    </>
  );
}
