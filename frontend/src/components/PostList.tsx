import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../hooks/api";
import { getGatherPostList, getPostList } from "../api";
import Pagination from "./Pagination";
import PostCardItem, { PostCardItemSkeleton } from "./PostCardItem";
import PostListItem, { PostListItemSkeleton } from "./PostListItem";
import { parseQuery } from "../utils/url";
import DisplayError from "./DisplayError";
import "./PostList.css";

const USES_CARD_DESIGN = ["gather", "study", "code", "team"];
const SKELETONS_LENGTH = 8;

export default function PostList({
  subject,
  limit,
  preventPaginate,
}: IPostListProps) {
  const location = useLocation();
  const { page } = parseQuery(location.search);
  const [response, setResponse] = useState<
    IPostListResponse | IGatherPostListResponse
  >();
  const [currentPage, setCurrentPage] = useState<number>(page ? +page || 1 : 1);
  const usesCardDesign = USES_CARD_DESIGN.includes(subject);
  const ListOfElements = useCallback(() => {
    if (response) {
      if (response.posts.length === 0) {
        return <DisplayError message="아직 아무런 글이 없어요" />;
      }

      if (usesCardDesign) {
        return (response.posts as Array<IGatherPostInList>).map(PostCardItem);
      }

      return (response.posts as Array<IPostInList>).map(PostListItem);
    }

    const tmpArray = Array.from({ length: limit || SKELETONS_LENGTH });

    if (usesCardDesign) {
      // eslint-disable-next-line react/no-array-index-key
      return tmpArray.map((_, i) => <PostCardItemSkeleton key={i} />);
    }

    // eslint-disable-next-line react/no-array-index-key
    return tmpArray.map((_, i) => <PostListItemSkeleton key={i} />);
  }, [response]);

  const paginate = useCallback((pageNumber: number) => {
    location.search = `?page=${pageNumber}`;
  }, []);

  useEffect(() => {
    async function getCardOrListPosts() {
      const gatherSubject = subject.replace("gather", "");
      const postsResponse = await useApi(
        usesCardDesign
          ? getGatherPostList({
              category: gatherSubject as TGatherCategory,
              perPage: limit,
              page: currentPage,
            })
          : getPostList({
              subject,
              perPage: limit,
              page: currentPage,
            })
      );

      setResponse(postsResponse);
    }

    getCardOrListPosts();
  }, [currentPage]);

  useEffect(() => {
    const { page: current } = parseQuery(location.search);

    setCurrentPage(current ? +current || 1 : 1);
  }, [location.search]);

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
