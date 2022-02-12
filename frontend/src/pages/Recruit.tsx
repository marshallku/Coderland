import AddPostButton from "../components/AddPostButton";
import PageTitle from "../components/PageTitle";
import PostList from "../components/PostList";

export default function Recruit() {
  return (
    <>
      <PageTitle subject="recruit" />
      <PostList subject="recruit" />
      <AddPostButton to="recruit" />
    </>
  );
}
