import { useState, useEffect, useCallback } from "react";
import { dummyGathersResponse, dummyPostsResponse } from "../api/dummy";
import Pagination from "./Pagination";
import Loader from "./Loader";
import PostCardItem from "./PostCardItem";
import PostListItem from "./PostListItem";
import "./PostList.css";

const USES_CARD_DESIGN = ["gather"];

export default function PostList({ subject }: IPostListProps) {
  // TODO: 타입 세팅
  const [response, setResponse] = useState<
    IPostListResponse | IGatherPostListResponse
  >();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usesCardDesign = USES_CARD_DESIGN.includes(subject);

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  useEffect(() => {
    async function getCardOrListPosts() {
      const postsResponse = await (usesCardDesign
        ? dummyGathersResponse
        : dummyPostsResponse);

      setResponse(postsResponse);
    }
    getCardOrListPosts();
  }, [currentPage]);

  if (!response) {
    return <Loader />;
  }
  return (
    <>
      <div
        className={`post-list ${
          usesCardDesign ? "post-list--card" : "post-list--list"
        }`}
      >
        {usesCardDesign
          ? (response.posts as Array<IGatherPost>).map(PostCardItem)
          : (response.posts as Array<Omit<IPost, "contents" | "subject">>).map(
              PostListItem
            )}
      </div>
      <Pagination paginate={paginate} data={response.pagination} />
    </>
  );
}
