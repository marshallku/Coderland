import "./PostList.css";
import { useState, useEffect, useCallback } from "react";

import { dummyGathersResponse, dummyPostsResponse } from "../api/dummy";
import Posts from "./Posts";
import Pagination from "./Pagination";
import Loader from "./Loader";

export default function PostList({ subject }: IPostListProps) {
  const [currentPosts, setCurrentPosts] = useState<
    IPostListResponse | IGatherPostListResponse
  >();
  const [currentPage, setCurrentPage] = useState<number>(3);
  const [postsPerPage] = useState(10);

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    async function getCardOrListPosts() {
      let postsResponse;
      if (subject === "gathering") {
        postsResponse = await dummyGathersResponse.then((result) => result);
      } else {
        postsResponse = await dummyPostsResponse.then((result) => result);
      }
      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPostsResponse = { ...postsResponse };
      currentPostsResponse.posts = postsResponse.posts.slice(
        indexOfFirstPost,
        indexOfLastPost
      );
      setCurrentPosts(currentPostsResponse);
    }
    getCardOrListPosts();
  }, [currentPage]);

  if (!currentPosts) {
    return <Loader />;
  }
  return (
    <div className="post-list">
      <Posts subject={subject} postList={currentPosts.posts} />
      <Pagination paginate={paginate} paginateInfo={currentPosts?.pagination} />
    </div>
  );
}
