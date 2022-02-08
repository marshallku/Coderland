import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { dummyGathersResponse, dummyPostsResponse } from "../api/dummy";
import Pagination from "./Pagination";
import PostCardItem, { PostCardItemSkeleton } from "./PostCardItem";
import PostListItem, { PostListItemSkeleton } from "./PostListItem";
import parseQuery from "../utils/url";
import "./PostList.css";

const USES_CARD_DESIGN = ["gather", "study", "code", "team"];
const SKELETONS_LENGTH = 8;

export default function PostList({ subject, preventPaginate }: IPostListProps) {
  const { search } = useLocation();
  const { page } = parseQuery(search);
  const [response, setResponse] = useState<
    IPostListResponse | IGatherPostListResponse
  >();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page || 1 : 1);
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

  const ListOfElements = () => {
    if (response) {
      if (usesCardDesign) {
        return (response.posts as Array<IGatherPost>).map(PostCardItem);
      }

      return (response.posts as Array<Omit<IPost, "contents" | "subject">>).map(
        PostListItem
      );
    }

    const tmpArray = Array.from({ length: SKELETONS_LENGTH });

    if (usesCardDesign) {
      // eslint-disable-next-line react/no-array-index-key
      return tmpArray.map((_, i) => <PostCardItemSkeleton key={i} />);
    }

    // eslint-disable-next-line react/no-array-index-key
    return tmpArray.map((_, i) => <PostListItemSkeleton key={i} />);
  };

  return (
    <>
      <div
        className={`post-list ${
          usesCardDesign ? "post-list--card" : "post-list--list"
        }`}
      >
        {ListOfElements()}
      </div>
      {!preventPaginate && response && (
        <Pagination paginate={paginate} data={response.pagination} />
      )}
    </>
  );
}
