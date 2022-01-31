import { useState, useEffect, useCallback } from "react";
import { dummyGathersResponse, dummyPostsResponse } from "../api/dummy";
import Posts from "./Posts";
import Pagination from "./Pagination";
import Loader from "./Loader";

const USES_CARD_DESIGN = ["gathering"];

export default function PostList({ subject }: IPostListProps) {
  const [currentPosts, setCurrentPosts] = useState<
    IPostListResponse | IGatherPostListResponse
  >();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    async function getCardOrListPosts() {
      const postsResponse = await (USES_CARD_DESIGN.includes(subject)
        ? dummyGathersResponse
        : dummyPostsResponse);

      setCurrentPosts(postsResponse);
    }
    getCardOrListPosts();
  }, [currentPage]);

  if (!currentPosts) {
    return <Loader />;
  }
  return (
    <>
      <Posts subject={subject} postList={currentPosts.posts} />
      <Pagination paginate={paginate} paginateInfo={currentPosts.pagination} />
    </>
  );
}
