import useApi from "../hooks/api";
import { dummyPostsResponse } from "../api/dummy";
import AddPostButton from "../components/AddPostButton";
import Loader from "../components/Loader";
import PostList from "../components/PostList";

export default function Review() {
  const response = useApi(dummyPostsResponse);

  if (!response) return <Loader />;

  return (
    <>
      <PostList subject="review" />
      <AddPostButton to="review" />
    </>
  );
}
