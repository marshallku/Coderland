import { useApi } from "../api";
import { dummyPostsResponse } from "../api/dummy";
import Loader from "../components/Loader";
import PostList from "../components/PostList";

export default function Review() {
  const response = useApi(dummyPostsResponse);

  if (!response) return <Loader />;

  return <PostList subject="review" />;
}
