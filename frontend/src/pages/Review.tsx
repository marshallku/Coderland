import AddPostButton from "../components/AddPostButton";
import PageTitle from "../components/PageTitle";
import PostList from "../components/PostList";

export default function Review() {
  return (
    <>
      <PageTitle subject="review" />
      <PostList subject="review" />
      <AddPostButton to="review" />
    </>
  );
}
